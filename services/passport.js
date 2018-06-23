const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

/* Used to find the unique user */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/* Used to find the unique user */
passport.deserializeUser((id, done) => {
  User.findById(id)
  .then((user) => {
    done(null, user);
  })
});

/* Implement the Google OAuth */
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleSecret,
    callbackURL: keys.googleCallbackURI,
    proxy: true
  },

  async (accessToken, refreshToken, profile, done) => {

    // find user, if they exist
    const existingUser = await User.findOne({googleID: profile.id});

    // User already exists
    if(existingUser) {
      return done(null, existingUser);
    }

    // else, save the user
    const user = await User({ googleID: profile.id }).save()
    done(null, user);
  }
));

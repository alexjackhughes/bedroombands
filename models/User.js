const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Create Schema */
const userSchema = new Schema({
  googleID: String,
  credits: {
    type: Number,
    default: 0
  },
  username: {type: String, default: ""},
  blurb: {type: String, default: ""},
  email: {type: String, default: ""},
  username: {type: String, default: ""},
  exampleTrack: String,
  likedTracks: [String],
  myTracks: [String],
  genres: [String],
  instruments: [String]
});

/* Assign Schema to Collection */
mongoose.model('users', userSchema);

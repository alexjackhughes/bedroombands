const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // Login via Google
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect("/"); // this is causing a # from react router bug
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  })
};

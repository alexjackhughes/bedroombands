const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");
const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = app => {
  // GET one User
  app.get("/api/user/:userId", (req, res) => {
    User.findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User is not found!"
          });
        }

        res.send(user);
      })
      .catch(err => {});
  });

  // GET all Users
  app.get("/api/users", async (req, res) => {
    const users = await User.find({});
    res.send(users);
  });

  //UPDATE one User
  app.put("/api/current_user", requireLogin, async (req, res) => {
    console.log("Request:");
    console.log(req.body);

    // Make sure request isn't empty
    if (!req.body) {
      return res.status(404).send({
        message: "You need to provide values!"
      });
    }

    const userById = await User.findByIdAndUpdate(
      req.user._id,
      {
        username: req.body.username,
        blurb: req.body.blurb,
        email: req.body.email,
        likedTracks: req.body.likedTracks,
        exampleTrack: req.body.exampleTrack,
        myTracks: req.body.myTracks,
        genres: req.body.genres,
        instruments: req.body.instruments
      },
      { new: true }
    ).then(user => {
      console.log("User was updated");
      res.send(user);
    });
  });

  // DELETE one User
  app.delete("/api/current_user", requireLogin, (req, res) => {
    User.findByIdAndRemove(req.user._id).then(user => {
      res.send({ message: "User deleted successfully" });
    });
  });

  // Create a user
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // Login via Google
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/tracks");
    }
  );

  // Logout via google
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Get current user
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};

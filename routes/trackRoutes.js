const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireTrack = require("../middlewares/requireTrack");
var _ = require("underscore");

const Track = mongoose.model("tracks");
const User = mongoose.model("users");

module.exports = app => {
  // GET: All Tracks
  app.get("/api/tracks/:limit", (req, res) => {
    if (req.params.limit <= 10) {
      req.params.limit = 10;
    }

    let limit = parseInt(req.params.limit);

    Track.find()
      .limit(limit)
      .sort("-createdOn")
      .then(tracks => {
        res.send(tracks);
      })
      .catch(err => {
        res.status(500).send({ err, message: "Tracks not found!" });
      });
  });

  // GET: Tracks from array
  app.post("/api/tracks/array", async (req, res) => {
    let listOfIds = req.body.array;

    const tracks = await Track.find({ _id: listOfIds });

    res.send(tracks);
  });

  // GET: One Track by Id
  app.get("/api/track/:trackId", (req, res) => {
    Track.findById(req.params.trackId)
      .then(track => {
        if (!track) return res.status(404).send({ message: "Track not found" });

        res.send(track);
      })
      .catch(() => {
        return res.status(404).send({ message: "Please try again" });
      });
  });

  // GET: Filter Tracks by Genre
  app.get("/api/tracks/genre/:genre", (req, res) => {
    Track.find({ genres: req.params.genre })
      .then(track => {
        if (!track) return res.status(404).send({ message: "Track not found" });

        res.send(track);
      })
      .catch(() => {
        return res.status(404).send({ message: "Please try again" });
      });
  });

  // GET: Filter Tracks by type
  app.get("/api/tracks/type/:type", (req, res) => {
    Track.find({ type: req.params.type })
      .then(track => {
        if (!track) return res.status(404).send({ message: "Track not found" });

        res.send(track);
      })
      .catch(() => {
        return res.status(404).send({ message: "Please try again" });
      });
  });

  // GET: Filter Tracks by Instrument
  app.get("/api/tracks/instrument/:instrument", (req, res) => {
    Track.find({ instruments: req.params.instrument })
      .then(track => {
        if (!track) return res.status(404).send({ message: "Track not found" });

        res.send(track);
      })
      .catch(() => {
        return res.status(404).send({ message: "Please try again" });
      });
  });

  // GET: Filter Tracks by rating
  app.get("/api/tracks/rating/:rating", (req, res) => {
    Track.find({ currentRating: req.params.rating })
      .then(track => {
        if (!track) return res.status(404).send({ message: "Track not found" });

        res.send(track);
      })
      .catch(() => {
        return res.status(404).send({ message: "Please try again" });
      });
  });

  // GET: my Tracks
  app.get("/api/my-tracks", requireLogin, (req, res) => {
    res.send(req.user.myTracks);
  });

  // GET: my liked Tracks
  app.get("/api/liked-tracks/", requireLogin, (req, res) => {
    res.send(req.user.likedTracks);
  });

  // CREATE: A Track
  app.post("/api/track", requireLogin, (req, res) => {
    // Check that body exists
    if (!req.body) {
      return res.status(404).send({
        message: "You need to provide values!"
      });
    }

    console.log(req.body.artists);

    // Create the track model
    const track = new Track({
      title: req.body.title,
      soundCloudUrl: req.body.soundCloudUrl,
      description: req.body.description,
      artists: req.body.artists, // Need to add originator
      ratings: [{ id: req.user._id, rating: 5 }],
      currentRating: 5,
      genres: req.body.genres,
      instruments: req.body.instruments
    });

    // Save track
    track.save().then(async data => {
      let newTrack = await Track.findOne({
        soundCloudUrl: req.body.soundCloudUrl
      });

      // Add Track ID to current author
      req.user.myTracks.push(newTrack._id);
      const user = await req.user.save();
      res.send(user);

      // Add track id to all other authors
      newTrack.artists.map(async artist => {
        if (artist == req.user._id) {
          return;
        }
        let newArtist = await User.findById(artist);

        newArtist.myTracks.push(newTrack._id);
        const newArtistTrack = await newArtist.save();
      });
    });
  });

  // UPDATE: Add one to my tracks
  app.put("/api/my-tracks/:trackId", requireLogin, async (req, res) => {
    req.user.myTracks.push(req.params.trackId);
    const user = await req.user.save();

    res.send(user);
  });

  // DELETE: Delete one from my tracks
  app.delete("/api/my-tracks/:trackId", requireLogin, async (req, res) => {
    let index = req.user.myTracks.indexOf(req.params.trackId);

    if (index > -1) {
      req.user.myTracks.splice(index, 1);
      const user = await req.user.save();

      return res.send(user);
    }

    return res.status(404).send({ message: "You don't own this track" });
  });

  // Rate a track has a number of conditions:
  // 1. make sure user hasn't rated before
  // 2. allow user to rate track
  // 3. calculate the new current rating for track
  //
  // NOT WORKING
  app.put(
    "/api/rate-track/:trackId/rating/:rating",
    requireLogin,
    async (req, res) => {
      Track.findById(req.params.trackId)
        .then(track => {
          if (!track)
            return res.status(404).send({ message: "Track not found" });

          let currentUserRating = -1;
          let ratingIndex;

          // Check each rating to see if it matches user
          track.ratings.map((rating, index) => {
            if (rating.id == req.user._id) {
              currentUserRating = rating;
              ratingIndex = index;
            }
          });

          // User has never rated before:
          if (currentUserRating == -1) {
            track.ratings.push({ id: req.user._id, rating: req.params.rating });

            // User has rated, so replace old rating
          } else {
            track.ratings[ratingIndex] = {
              id: req.user._id,
              rating: req.params.rating
            };
          }

          // Finally re-calculate the current rating
          let sum = 0;
          track.ratings.map(rating => {
            sum += parseInt(rating.rating, 10);
          });

          track.currentRating = Math.round(sum / track.ratings.length);
          res.send(track);
        })
        .catch(() => {
          return res.status(404).send({ message: "Please try again" });
        });

      res.send(track);
    }
  );

  // UPDATE: Add one to my liked tracks
  app.put("/api/liked-tracks/:trackId", requireLogin, async (req, res) => {
    // if track is already in list, remove it
    if (req.user.likedTracks.includes(req.params.trackId)) {
      let index = req.user.likedTracks.indexOf(req.params.trackId);
      if (index > -1) {
        req.user.likedTracks.splice(index, 1);
      }

      // Otherwise, add it to list
    } else {
      req.user.likedTracks.push(req.params.trackId);
    }

    const user = await req.user.save();
    res.send(user);
  });

  // NOT NEEDED - DELETE: Delete one from my liked tracks
  app.delete("/api/liked-tracks/:trackId", requireLogin, async (req, res) => {
    let index = req.user.likedTracks.indexOf(req.params.trackId);
    if (index > -1) {
      req.user.likedTracks.splice(index, 1);
      const user = await req.user.save();

      res.send(user);
    }
  });

  // UPDATE: A Track
  app.put("/api/track/:trackId", requireLogin, requireTrack, (req, res) => {
    if (!req.body) {
      return res.status(404).send({
        message: "You need to provide values!"
      });
    }

    Track.findByIdAndUpdate(
      req.params.trackId,
      {
        title: req.body.title,
        soundCloudUrl: req.body.soundCloudUrl,
        description: req.body.description,
        artists: req.body.artists,
        ratings: req.body.ratings,
        currentRating: req.body.currentRating,
        genres: req.body.genres,
        instruments: req.body.instruments,
        type: req.body.type
      },
      { new: true }
    ).then(track => {
      res.send(track);
    });
  });

  // DELETE: A Track
  app.delete(
    "/api/track/:trackId",
    requireLogin,
    requireTrack,
    async (req, res) => {
      console.log("got to here");
      Track.findByIdAndRemove(req.params.trackId)
        .then(track => {
          res.send({ message: "The Track was deleted successfully" });
        })

        // Remove track id from current users' tracks
        .then(async () => {
          let index = req.user.myTracks.indexOf(req.params.trackId);
          if (index > -1) {
            req.user.myTracks.splice(index, 1);
            const user = await req.user.save();

            res.send(user);
          }
        });
    }
  );
};

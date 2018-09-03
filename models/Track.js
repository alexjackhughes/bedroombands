const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Create Schema */
const trackSchema = new Schema({
  id: String,
  title: { type: String, default: "Song Track" },
  soundCloudUrl: String,
  type: { type: String, default: "progress" },
  blurb: { type: String, default: "Can you sing with all the voices of the mountains, can you paint with all the colors of the wind?" },
  artists: [String],
  ratings: [
    {
      id: String,
      rating: Number
    }
  ],
  currentRating: Number,
  genres: [String],
  instruments: [String]
});

/* Assign Schema to Collection */
mongoose.model("tracks", trackSchema);

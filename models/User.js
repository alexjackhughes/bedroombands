const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Create Schema */
const userSchema = new Schema({
  googleID: String,
  credits: {
    type: Number,
    default: 0
  },
  username: { type: String, default: String(Math.random() * 1000 + 1) },
  blurb: {
    type: String,
    default: "My favourite band is Jedward and maybe I should change my bio"
  },
  email: { type: String, default: "example@bedroombands.com" },
  exampleTrack: String,
  likedTracks: [String],
  myTracks: [String],
  genres: [String],
  instruments: [String]
});

/* Assign Schema to Collection */
mongoose.model("users", userSchema);

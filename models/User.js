const mongoose = require("mongoose");
const { Schema } = mongoose;

/* Create Schema */
let x = ['Purple', 'Red', 'Green', 'Blue', 'Yellow', 'Pink', 'Orange', 'Burgundy', 'Byzantium', 'Crimson', 'Coral', 'Lime', 'Ivory', 'Jade', 'Lemon', 'Lavender', 'Pear', 'Tan', 'White'];
let y = ['Fancy', 'Plump', 'Shy', 'Gifted', 'Lively', 'Sparkly', 'Grumpy', 'Immense', 'Short', 'Stumpy', 'Tinkly', 'Sparkly', 'Squeaking', 'Clever'];
let z = ['Monkey', 'Dinosaur', 'Cat', 'Dog', 'Lion', 'Ship', 'Mouse', 'Jellyfish', 'Ant', 'Bug', 'Spider', 'Fly', 'Lynx', 'Lizard', 'Bird', 'Fox', 'Hare', 'Bear', 'Ape'];

let username = `${x[Math.floor(Math.random() * x.length)]} ${y[Math.floor(Math.random() * y.length)]} ${z[Math.floor(Math.random() * z.length)]}`;

const userSchema = new Schema({
  googleID: String,
  credits: {
    type: Number,
    default: 0
  },
  username: { type: String, default: username },
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

const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Create Schema */
const trackSchema = new Schema({
  id: String,
  title: String,
  soundCloudUrl: String,
  blurb: String,
  artists: [String],
  ratings: [{
              "id":String,
              "rating":Number
            }],
  currentRating: Number,
  genres: [String],
  instruments: [String]
});

/* Assign Schema to Collection */
mongoose.model('tracks', trackSchema);

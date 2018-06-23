const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Create Schema */
const userSchema = new Schema({
  googleID: String,
  credits: {
    type: Number,
    default: 0
  }
});

/* Assign Schema to Collection */
mongoose.model('users', userSchema);

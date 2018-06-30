const mongoose = require('mongoose');
const { Schema } = mongoose;

/* Create Schema */
const recipientSchema = new Schema({
  email: String,
  responded: {type: Boolean, default: false}
});

module.exports = recipientSchema;

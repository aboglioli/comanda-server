const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user: {type: String, required: true},
  password: {type: String, required: true},
  name: String,
  email: String,
  scope: [String],
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);

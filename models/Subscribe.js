var mongoose = require('mongoose');

var subscribeSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true }
});

module.exports = mongoose.model('Subscribe', subscribeSchema);
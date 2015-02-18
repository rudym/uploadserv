var crypto = require('crypto');
var mongoose = require('mongoose');

var fileSchema = new mongoose.Schema({  
  name: String,
  location: String,
  posted: Date
});

module.exports = mongoose.model('File', fileSchema);

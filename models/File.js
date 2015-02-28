var mongoose = require('mongoose');

var fileSchema = new mongoose.Schema({  
  name: String,
  location: String
});

module.exports = mongoose.model('File', fileSchema);

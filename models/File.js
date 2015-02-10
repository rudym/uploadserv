var crypto = require('crypto');
var mongoose = require('mongoose');

var fileSchema = new mongoose.Schema({  
  name: String,
  location: String,
  uploadDate: Date
});

/**
 * Helper method for getting file's thumbnail.
 */
fileSchema.methods.thumbnail = function() {
  var md5 = crypto.createHash('md5').update(this.name).digest('hex');
  return 'https://thumbnail' + md5;
};

module.exports = mongoose.model('File', fileSchema);

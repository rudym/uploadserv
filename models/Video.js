var crypto = require('crypto');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var videoSchema = new mongoose.Schema({
  scriptId: ObjectId,  
  name: String,
  filelocation: String,
  uploadDate: Date
});

/**
 * Helper method for getting file's thumbnail.
 */
videoSchema.methods.thumbnail = function() {
  var md5 = crypto.createHash('md5').update(this.name).digest('hex');
  return 'https://thumbnail' + md5;
};

module.exports = mongoose.model('Video', videoSchema);

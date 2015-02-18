var crypto = require('crypto');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var commentSchema = new mongoose.Schema({
  _topic : { type: ObjectId, ref: 'Video' },
  slug: String,
  posted: Date,
  author: {
  	id: { type: ObjectId, ref: 'User' },
  	name: String
  },
  text: String
});

module.exports = mongoose.model('Comment', commentSchema);
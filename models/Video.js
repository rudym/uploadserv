var mongoose = require('mongoose');
//var Comment = require('../models/Comment');
var ObjectId = mongoose.Schema.ObjectId;

var videoSchema = new mongoose.Schema({
  _creator : { type: ObjectId, ref: 'User' },
  _script : { type: ObjectId, ref: 'Script' },
  name: String,
  filelocation: String,
  /*userswholiked: [ { 
  	userId: {type: ObjectId, unique: true},
  	username: String }
  ],*/
  likes: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },

  comments: [ { type: ObjectId, ref: 'Comment' } ]
});

module.exports = mongoose.model('Video', videoSchema);

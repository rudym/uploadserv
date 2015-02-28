var mongoose = require('mongoose');

var scriptSchema = new mongoose.Schema({  
  name: String,
  chaptername: {type: String, unique: true},
  duedate: Date,
  text: String
});

module.exports = mongoose.model('Script', scriptSchema);

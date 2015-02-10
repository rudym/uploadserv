var mongoose = require('mongoose');

var scriptSchema = new mongoose.Schema({  
  name: String,
  chapterName: String,
  calendarDate: Date,
  text: String
});

module.exports = mongoose.model('Script', scriptSchema);

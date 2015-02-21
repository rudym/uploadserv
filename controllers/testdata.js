var User = require('../models/User');
var Video = require('../models/Video');
var Script = require('../models/Script');
/**
 * GET /loadtestdata
 */
exports.load = function(req, res, next) {
 
  /*var user = new User({
    email: 'test@gmail.com',
    password: 'password'
  });
  user.save(function(err) {
    if (err) return next(err);
  });*/
  
  var script = new Script({
    name: 'Test Script Name',
    chaptername: '01 Test chapter name',
    duedate: Date(),
    posted: Date(),
    text: 'Big long text of the script...'
  });
  script.save(function(err) {
    if (err) return next(err);
  });

  var script2 = new Script({
    name: 'Test Script Name',
    chaptername: '02 Test chapter name',
    duedate: Date(),
    posted: Date(),
    text: 'Second Big long text of the script...'
  });
  script2.save(function(err) {
    if (err) return next(err);
  });

  /*
   if (user.videos.length == 0) {
      Script.findOne(function(err, script) {
        if (err) return next(err);

        var video = new Video({
          _creator: user._id,
          _script: script._id,  
          name: "My test video",
          filelocation: "http://frigg:3000/test.MOV",
          uploadDate: Date() });
        video.save(function (err) {
          if (err) return next(err);
          // saved!
        });

        user.videos.push(video);
        user.save(function (err) {
          if (err) return next(err);
          // saved!
        });
      });      
    }
    User.findOne({ email: 'test@gmail.com' }, function(err, user) {
    if (err) return next(err);
    
    Script.findOne({ chaptername: 'Test chapter name' }, function(err, script) {
      if (err) return next(err);

      var video = new Video({
        _creator: user._id,
        _script: script._id, 
        name: "My test video",
        filelocation: "http://youtu.be/C0DPdy98e4c",
        posted: Date() 
      });        
    
      video.save(function (err) {
        if (err) return next(err);
      });

      user.videos.push(video);

      user.save(function (err) {
        if (err) return next(err);
      });
    });
  });*/

  res.redirect('/');
};

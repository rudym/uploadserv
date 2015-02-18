var User = require('../models/User');
var Script = require('../models/Script');
var Video = require('../models/Video');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  User.findById(req.user.id)
  .populate('videos')
  .exec(function(err, user) {

    if (err) return next(err);

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

    Script.findOne(function(err, script) {
      if (err) return next(err);

      if (!script) {
        script = new Script({
          name: 'Test Script Name',
          chaptername: 'Test chapter name',
          duedate: Date(),
          posted: Date(),
          text: 'Big long text of the script...'
        });
        
        script.save(function (err) {
          if (err) return next(err);
          // saved!
        });
      }

      res.render('main', {
        title: 'Home',
        "videos" : user.videos, //[{name: "The name", filelocation: "HelloLocation"}]
        "script" : script
      });
    });
  });
};
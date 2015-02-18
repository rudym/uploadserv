var User = require('../models/User');
var Script = require('../models/Script');
var Video = require('../models/Video');

function GetVideosByUser(user_id, next) {
  console.log(user_id);
  User.findById(user_id)
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

    console.log(user.videos);
    return user.videos;  
  });
}
/**
 * GET /usrvideos
 * User videos page.
 */
exports.getVideos = function(req, res, next) {
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
  
    res.render('usrvideos', {
      title: 'User videos',
      "videos" : user.videos //[{name: "The name", filelocation: "HelloLocation"}]
    });
  });
};


/**
 * POST /like
 * Set like for a video
 */
exports.postLike = function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);
    
    if (user.videos.length == 0) {
      Script.findOne(function(err, script) {
        if (err) return next(err);

        var video = new Video({ scriptId: script._id,  
                                name: "My test video",
                                filelocation: "http://frigg:3000/test.MOV",
                                uploadDate: Date() });
        user.videos.push(video);
      
        user.save(function (err) {
          if (err) return next(err);
          // saved!
        });
      });      
    }   

    res.render('usrvideos', {
      title: 'User videos',
      "videos" : user.videos
    });
  });
};
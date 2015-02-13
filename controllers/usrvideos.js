var User = require('../models/User');
var Script = require('../models/Script');
var Video = require('../models/Video');

/**
 * GET /usrvideos
 * User videos page.
 */
exports.getVideos = function(req, res) {
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);
    
    if (user.videos.length == 0) {
      Script.findOne(function(err, script) {
        if (err) return next(err);

        console.log("creating video, {0}", user.videos);
        var video = new Video({ scriptId: script._id,  
                                name: "My test video",
                                filelocation: "http://youtu.be/C0DPdy98e4c",
                                uploadDate: Date() });
        console.log("pushing video, {0}", video);
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
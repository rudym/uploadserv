var chai = require('chai');
var should = chai.should();
var User = require('../models/User');
var Script = require('../models/Script');
var Video = require('../models/Video');
var Comment = require('../models/Comment');

describe('Comments Model', function() {
  it('should create a new user', function(done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) return done(err);
      done();
    })
  });

  it('should create a new script', function(done) {
    var script = new Script({
      name: 'Test Script Name',
      chaptername: 'Test chapter name',
      duedate: Date(),
      posted: Date(),
      text: 'Big long text of the script...'
    });
    script.save(function(err) {
      if (err) return done(err);
      done();
    })
  });

  it('should create a new video to user', function(done) {
    User.findOne({ email: 'test@gmail.com' }, function(err, user) {
      if (err) return done(err);
      
      Script.findOne({ chaptername: 'Test chapter name' }, function(err, script) {
        if (err) return done(err);

        var video = new Video({
          _creator: user._id,
          _script: script._id, 
          name: "My test video",
          filelocation: "http://youtu.be/C0DPdy98e4c",
          posted: Date() 
        });        
      
        video.save(function (err) {
          if (err) return done(err);
        });

        user.videos.push(video);
        user.save(function (err) {
          if (err) return done(err);
          done();
        });
      });  
    });
  });




  it('should delete a video', function(done) {
    Video.remove({ name: 'My test video' }, function(err) {
      if (err) return done(err);
      done();
    });
  });

  it('should delete a script', function(done) {
    Script.remove({ chaptername: 'Test chapter name' }, function(err) {
      if (err) return done(err);
      done();
    });
  });
  it('should delete a user', function(done) {
    User.remove({ email: 'test@gmail.com' }, function(err) {
      if (err) return done(err);
      done();
    });
  });
});
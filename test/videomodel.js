var chai = require('chai');
var should = chai.should();
var User = require('../models/User');
var Script = require('../models/Script');
var Video = require('../models/Video');

describe('Script Model', function() {
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

  it('should not create a script with the unique chaptername', function(done) {
    var script = new Script({
      name: 'Test Script Name',
      chaptername: 'Test chapter name',
      duedate: Date(),
      posted: Date(),
      text: 'Big long text of the script...'
    });
    script.save(function(err) {
      if (err) err.code.should.equal(11000);
      done();
    });
  });

  it('should find script by chaptername', function(done) {
    Script.findOne({ chaptername: 'Test chapter name' }, function(err, script) {
      if (err) return done(err);
      script.chaptername.should.equal('Test chapter name');
      done();
    });
  });

  it('should delete a script', function(done) {
    Script.remove({ chaptername: 'Test chapter name' }, function(err) {
      if (err) return done(err);
      done();
    });
  });
});


describe('Video Model', function() {
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

  /*it('should not create a video with the unique script_id and user_id', function(done) {
    User.findOne({ email: 'test@gmail.com' }, function(err, user) {
      if (err) return done(err);
      
      Script.findOne({ chaptername: 'Test chapter name' }, function(err, script) {
        if (err) return done(err);

        var video = new Video({
          user_id: user._id,
          script_id: script._id,  
          name: "My test video",
          filelocation: "http://youtu.be/C0DPdy98e4c",
          posted: Date() 
        });        
      
        video.save(function (err) {
          if (err) err.code.should.equal(11000);
          done();
        });
      });
    });
  });

  it('should create a second user', function(done) {
    var user = new User({
      email: 'test2@gmail.com',
      password: 'password2'
    });
    user.save(function(err) {
      if (err) return done(err);
      done();
    })
  });

  it('should create and push a new video to second user with the unique script_id', function(done) {
    User.findOne({ email: 'test2@gmail.com' }, function(err, user) {
      if (err) return done(err);
      
      Script.findOne({ chaptername: 'Test chapter name' }, function(err, script) {
        if (err) return done(err);

        var video = new Video({
          user_id: user._id,
          script_id: script._id,  
          name: "My test video",
          filelocation: "http://youtu.be/C0DPdy98e4c",
          posted: Date() 
        });        
      
        video.save(function (err) {
          if (err) return done(err);
          done();
        });
      });  
    });
  });*/

  it('should find video by user_id', function(done) {
    User.findOne({ email: 'test@gmail.com' }, function(err, user) {
      if (err) return done(err);
      Video.findOne({ _creator: user._id}, function(err, video) {
        if (err) return done(err);
        video._creator.equals(user._id);
        done();
      });      
    });
  });

  it('should find video by user_id and populate video info ', function(done) {
    User.findOne({ email: 'test@gmail.com' })
    .populate('videos')
    .exec(function(err, user) {
      if (err) return done(err);
      user.videos[0]._creator.equals(user._id);
      done();
    });
  });

  it('should find user by video', function(done) {
    Video.findOne({ name: 'My test video' }, function(err, video) {
      if (err) return done(err);
      User.findOne({ _id: video._creator }, function(err, user) {
        if (err) return done(err);
        video._creator.equals(user._id);
        done();
      });      
    });
  });

  it('should find user by video and populate user info', function(done) {
    Video.findOne({ name: 'My test video' })
    .populate('_creator')
    .exec(function(err, video) {
      if (err) return done(err);
      video._creator.email.should.equal('test@gmail.com');
      done();   
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
  it('should delete a user', function(done) {
    User.remove({ email: 'test2@gmail.com' }, function(err) {
      if (err) return done(err);
      done();
    });
  });
});
var User = require('../models/User');
var Script = require('../models/Script');
var Video = require('../models/Video');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  Video.find({'_creator': req.user.id})
  .populate('_script', 'chaptername')
  .exec(function(err, videos) {
    if (err) return next(err);

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

      Script.find(function(err, scripts) {
        if (err) return next(err);

        res.render('main', {
          title: 'Home',
          "videos" : videos, //[{name: "The name", filelocation: "HelloLocation"}]
          "script" : script,
          "scripts" : scripts
        });
      });      
    });
  });
};
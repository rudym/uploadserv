var User = require('../models/User');
var Video = require('../models/Video');
var Script = require('../models/Script');
var format = require('util').format;
/**
 * GET /upload
 * Upload form page.
 */
exports.getUpload = function(req, res) {
  res.render('upload', {
    title: 'Upload'
  });
};

/**
 * POST /upload
 * Upload the file.
 */
exports.postUpload = function(req, res, next) {
  //console.log("Upload started! {0} ", req);

  /*res.send(format('\nuploaded %s (%d Kb) to %s as %s'
    , req.files.file.name
    , req.files.file.size / 1024 | 0 
    , req.files.file.path
    , req.body.title));*/



  // parse a file upload

  /*var form = new formidable.IncomingForm();

  util.log("Form {1} ", form); 

  form.parse(req, function(err, fields, files) {
    if (err) return next(err);
    util.log("fields {2} ", fields);
    util.log("files {3} ", files);
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    util.log(util.inspect({fields: fields, files: files}));
    res.end(util.inspect({fields: fields, files: files}));
  });*/

  if(!req.user.id || !req.body._script) return next('req parameter undefined');

  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);

    Script.findById(req.body._script, function(err, script) {
      if (err) return next(err);

      //console.log("req.body._script {0} ", req.body);
      //console.log("script {0} ", script);

      var video = new Video({
        _creator: user._id,
        _script: script._id,  
        name: req.body.videoname,
        filelocation: req.files.file.path,
        uploadDate: Date() });
      video.save(function (err) {
        if (err) return next(err);
        // saved!
      });

      user.videos.push(video);

      user.save(function(err) {
        if (err) return next(err);
        req.flash('success', { msg: 'Video uploaded.' });
        res.redirect('/');
      });
    });
  });
};
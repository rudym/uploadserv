var File = require('../models/File');

/**
 * GET /upload
 * Upload form page.
 */
exports.getUpload = function(req, res) {
  if (req.user) return res.redirect('/');
  res.render('upload', {
    title: 'Upload'
  });
};

/**
 * POST /upload
 * Upload the file.
 */
exports.postUpload = function(req, res, next) {
  //req.assert('email', 'Email is not valid').isEmail();
  //req.assert('password', 'Password cannot be blank').notEmpty();
  console.log("Upload!!!");
  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/upload');
  }

  /*passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      req.flash('errors', { msg: info.message });
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);*/

  req.flash('success', { msg: 'Upload success!.' });
};
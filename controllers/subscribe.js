var Subscribe = require('../models/Subscribe');
/**
 * POST /subscribe
 * Upload the file.
 */
exports.subscribe = function(req, res, next) { 
  //console.log("trying to subscribe here");
  req.assert('email', 'Email is not valid').isEmail();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    //console.log("errors probably");
    return next(errors);
  }

  var subscription = new Subscribe({
    email: req.body.email
  });
  subscription.save(function(err) {
    if (err) { 
      if(!err.code == 11000) {
        req.flash('errors', { msg: err.code });
        return next(err);
      }
    }
    console.log("saved!");
    req.flash('success', { msg: 'User has subscribed.' });
    return res.redirect('/');
  })
};
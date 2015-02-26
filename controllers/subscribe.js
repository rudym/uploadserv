/**
 * POST /subscribe
 * Upload the file.
 */
exports.subscribe = function(req, res, next) { 
  console.log("subscribe! {0}", req.body);
  req.flash('success', { msg: 'User subscribed.' });
  res.redirect('/');
};
/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  if (req.user) return res.redirect('/main');
  
  res.render('home', {
    title: 'Home'
  });
};
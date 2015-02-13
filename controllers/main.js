/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('main', {
    title: 'Home'
  });
};
var Script = require('../models/Script');

/**
 * GET /script
 * Script page.
 */
exports.getScript = function(req, res) {
  if (req.user) return res.redirect('/');

  Script.findOne(function(err, script) {
  	if (err) return next(err);

  	if (!script) {
        script = new Script({ name: 'My Script Name 2', calendarDate: new Date(), text: 'Big long text of the script...' });
        script.save(function (err) {
        if (err) return next(err);
        // saved!
      });
    }

    res.render('script', {
      title: 'Script',
      "script" : script
    });
  });
};

/**
 * GET /scripts
 * All Accessible Scripts page.
 */
exports.getScripts = function(req, res) {
  if (req.user) return res.redirect('/');
  res.render('scripts', {
    title: 'All Accessible Scripts'
  });
};
var express = require('express');
var router = express.Router();
var mw = require('../middleware');

/*******************************************************************************
 * Dispatch Root Page
 ******************************************************************************/
// this route for /contents dir, see app.js for initializer
router.get('/', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  res.render('main', { displayName: displayName, isAdmin: isAdmin });
});


module.exports = router;

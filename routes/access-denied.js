var express = require('express');
var router = express.Router();

/*******************************************************************************
 * Dispatch Root Page
 ******************************************************************************/
// this route for /access-denied dir, see app.js for initializer
router.get('/', function(req, res, next) {
  var displayName = req.user.displayName;

  res.render('access-denied', { displayName: displayName });
});


module.exports = router;

var express = require('express');
var router = express.Router();

/*******************************************************************************
 * Dispatch Root Page
 ******************************************************************************/
// this route for /access-denied dir, see app.js for initializer
router.get('/', function(req, res, next) {

  res.render('access-denied');
});


module.exports = router;

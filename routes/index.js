var express = require('express');
var router = express.Router();
/*******************************************************************************
 * Firebase Initialize
 ******************************************************************************/
 var firebase = require("../firebase");

/** Firebase End **************************************************************/


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  req.session.errors = null;
});


module.exports = router;

var express = require('express');
var router = express.Router();
/*******************************************************************************
 * Firebase Initialize
 ******************************************************************************/
 var firebase = require("../firebase");

 var firebaseAuth = require("../firebase-auth");

/** Firebase End **************************************************************/


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  req.session.errors = null;

  var login = {
    email: req.body.txtEmail,
    password: req.body.txtPassword
  };



});



module.exports = router;

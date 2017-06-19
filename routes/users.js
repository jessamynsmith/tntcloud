var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var admin = require('../firebase-admin-init')

/* GET users listing. */
// this router is for /users dir, see app.js for initializer
router.get('/', function(req, res, next) {
  res.send('user list');
});
// this is a subroute of the above / .../users
router.get('/user-create', function(req, res, next) {
  res.render('user-create');
});
// this is a subroute of the above / .../users
router.get('/user-create-input', function(req, res, next) {
  res.send('yup ');
});

/*******************************************************************************
 * Login
 ******************************************************************************/
router.post('/user-create-input', function(req, res){

	var email = req.body.email;
	var pass = req.body.password;

  admin.auth().createUser({
    email: email,
    emailVerified: false,
    password: pass,
    disabled: false
  })
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });
  res.render('/');
});


module.exports = router;

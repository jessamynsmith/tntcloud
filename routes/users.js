var express = require('express');
var router = express.Router();
/*******************************************************************************
 * Firebase Initialize
 ******************************************************************************/
 var firebase = require("../firebase");

 var dbRef = firebase.database().ref('node');

 var warrantyRef = dbRef.child('warranty');
// var usersRef = dbRef.child('users');
/** Firebase End **************************************************************/

var admin = require('../firebase-admin-init')



/* GET users listing. */
// this router is for /users dir, see app.js for initializer
router.get('/', function(req, res, next) {
  res.send('user list');
});
// this is a subroute of the above / .../users
router.get('/user-create', function(req, res, next) {
  res.render('users/user-create');
});
// this is a subroute of the above / .../users
router.get('/user-create-input', function(req, res, next) {
  res.send('yup ');
});
/*
// Insert Data
router.post('/user-create-input', function(req, res, next) {
  // get the form fields data
  var item = {
  	email: req.body.email,
  	pass: req.body.password
  };
  // insert
  // i could bind the database query to variable which is then promise...
  warrantyRef.push(item);
  // url redirect after post
  res.redirect('/core-warranty');
});
*/
/*******************************************************************************
 * Login
 ******************************************************************************/

router.post('/user-create-input', function(req, res){

  var item = {
  	email: req.body.email,
  	pass: req.body.password
  };

  warrantyRef.push(item);

  admin.auth().createUser(item)
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });

  // i could bind the database query to variable which is then promise...
  // url redirect after post
  res.redirect('user-create');
});


module.exports = router;

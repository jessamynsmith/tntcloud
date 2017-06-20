var express = require('express');
var router = express.Router();
/*******************************************************************************
 * Firebase Initialize
 ******************************************************************************/
 var firebase = require("../firebase");

 var dbRef = firebase.database().ref('node');

 var usersRef = dbRef.child('users');
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

/*******************************************************************************
 * Create New User
 ******************************************************************************/
router.post('/user-create-input', function(req, res){
  // get email, password, and role entered into create user form
  var newUser = {
  	email: req.body.email,
  	pass: req.body.password,
  	role: req.body.role
  };
  // Firebase auth createUser
  admin.auth().createUser({
    email: newUser.email,
    emailVerified: true,
    password: newUser.pass,
    disabled: false,
    role: newUser.role
  })
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    // Get UID and add user id to 'item' object so it can be set as child of users collection
    var newId = userRecord.uid;
    // Create new child to a specific path for the uid - use 'set' instead of 'push'
    usersRef.child(newId).set({
      email: newUser.email,
      role: newUser.role
    });
    console.log("Successfully created new user:", userRecord.uid);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });
  // url redirect after post
  res.redirect('user-create');
});

module.exports = router;

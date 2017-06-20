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
 * Login
 ******************************************************************************/

router.post('/user-create-input', function(req, res){
  // get email and password entered into create user form
  var newUser = {
  	email: req.body.email,
    emailVerified: true,
  	pass: req.body.password,
    disabled: false
  };

  	var email = req.body.email;
  	var pass =  req.body.password;

  admin.auth().createUser({
    email: email,
    emailVerified: true,
    password: pass,
    disabled: false
  })
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    // Add user id to 'item' object so it can be added pushed to db
    newUser.uid = userRecord.uid;
    usersRef.push(newUser);
    console.log("Successfully created new user:", userRecord.uid);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });

  // firebase.auth().sendPasswordResetEmail(emailOnly);

  // i could bind the database query to variable which is then promise...
  // url redirect after post
  res.redirect('user-create');
});


module.exports = router;

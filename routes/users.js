var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var admin = require('../firebase-admin-init')

/*******************************************************************************
 * Firebase Initialize
 ******************************************************************************/
 var dbRef = firebase.database().ref('node');

 var usersRef = dbRef.child('users');
/** Firebase End **************************************************************/


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

  var item = {
  	email: req.body.email,
  	pass: req.body.password
  };

  admin.auth().createUser(item)
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });

  // insert
  // i could bind the database query to variable which is then promise...
//  warrantyRef.push(item);
  // url redirect after post
  res.redirect('user-create');


});


module.exports = router;

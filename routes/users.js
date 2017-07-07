var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var mw = require('../middleware');
var dbRef = firebase.database().ref();
var admin = require('../private/firebase/firebase-admin-init')

/*******************************************************************************
 * Navigation: Users
 ******************************************************************************/
var navUsers =
  `<ul class="menu">
    <li><a href="/users">Users</a></li>
  </ul>`;

/*******************************************************************************
 * Users List
 ******************************************************************************/
// this router is for /users dir, see app.js for initializer
router.get('/', function(req, res, next) {
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  /*****************************************************************************
   * Data for Handlebars
  *****************************************************************************/
  dbRef.child('users').once('value', gotData);
  // global variable so warranty data can be accessed after the function
  var templateData;

  function gotData(data) {
    // access data values
    templateData = data.val();
    // Question) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // Answer) because the page render will happen faster than the data collection, so need to render to template after data collected
    // handlebars object: templateData: templateData === anyName: variableName
    res.render('users/users', { userData: templateData, navUsers: navUsers } );
  };
});

/*******************************************************************************
 * User Create: Page
 ******************************************************************************/
router.get('/user-create', function(req, res, next) {
  res.render('users/user-create', { navUsers: navUsers });
});

/*******************************************************************************
 * User Create: Form
 ******************************************************************************/
router.post('/user-create-input', function(req, res){
  // get email, password, displayName, and role entered into create user form
  var newUser = {
  	email: req.body.email,
  	pass: req.body.password,
  	displayName: req.body.displayName,
  	role: req.body.role
  };
  // Firebase auth createUser
  admin.auth().createUser({
    email: newUser.email,
    emailVerified: true,
    password: newUser.pass,
    displayName: newUser.displayName,
    disabled: false,
    role: newUser.role
  })
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    // https://firebase.google.com/docs/reference/admin/node/admin.auth.UserRecord
    // https://firebase.google.com/docs/auth/admin/manage-users#retrieve_user_data
    // Get UID and add user id to 'item' object so it can be set as child of users collection
    var newId = userRecord.uid;
    var usersRef = req.app.locals.dbRef.child('users');
    // Create new child to a specific path for the uid - use 'set' instead of 'push'
    // https://firebase.google.com/docs/database/admin/save-data
    usersRef.child(newId).set({
      email: newUser.email,
      displayName: newUser.displayName,
      role: newUser.role
    });
    console.log("Successfully created new user:", userRecord.uid);
    // url redirect after post
    res.redirect('/users');
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });
});

/*******************************************************************************
 * User Edit: Page
 ******************************************************************************/
router.get('/user-edit', function(req, res, next) {
  // get key from url query parameter '?KEY='
  var uid = req.query.KEY;

  admin.auth().getUser(uid)
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
  //    console.log("Successfully fetched user data:", userRecord.toJSON());
      var email = userRecord.email;
      res.render('users/user-edit', { navUsers: navUsers, uid: uid, email: email });
    })
    .catch(function(error) {
      console.log("Error fetching user data:", error);
    });
});

/*******************************************************************************
 * User Edit: Password Form
 ******************************************************************************/
router.post('/user-edit-password', function(req, res){

  // get email, password, and role entered into create user form
  var uid = req.body.uid;
  var newPassword = req.body.password;

  // Firebase auth createUser
  admin.auth().updateUser(uid, {
    password: newPassword
  })
    .then(function(userRecord) {
      res.redirect('/users');
    })
    .catch(function(error) {
      console.log("Error editing user:", error);
    });
});

/*******************************************************************************
 * User Edit: Role Form
 ******************************************************************************/
router.post('/user-edit-role', function(req, res){
  // get email, password, and role entered into create user form
  var item = {
    uid: req.body.uid,
  	role: req.body.role
  };
  // Select the user from the database that you want to edit
  var dbUpdate = req.app.locals.dbRef.child('users/' + item.uid).update({ 'role': item.role });

  dbUpdate.then(function() {
    // url redirect after post, include query parameter
    res.redirect('/users');
  })
  .catch(function(error) {
    console.log("error", error);
  });
});

/*******************************************************************************
 * User Delete: Page
 ******************************************************************************/
router.get('/user-delete', function(req, res, next) {
  var uid = req.query.KEY;

  admin.auth().getUser(uid)
    .then(function(userRecord) {
      userEmail = userRecord.email;
      // See the UserRecord reference doc for the contents of userRecord.
      res.render('users/user-delete', { navUsers: navUsers, userEmail: userEmail, uid: uid });
    })
    .catch(function(error) {
      console.log("Error fetching user data:", error);
    });
});


/*******************************************************************************
 * User Delete: Form
 ******************************************************************************/
router.post('/user-delete', function(req, res, next) {
  var user = req.app.locals.user;
  // uid of user to delete
  var uid = req.body.uid;

  /*****************************************************************************
   * Delete User: Realtime Database
  *****************************************************************************/
  // select the database collection and key/record you want to remove from db
  var personRef = req.app.locals.dbRef.child('users/' + uid);
  // remove record from database by adding 'remove()' to the dbRef
  var dbUpdate = personRef.remove();

  /*****************************************************************************
   * Delete User: Firebase
  *****************************************************************************/
  admin.auth().deleteUser(uid)
    .then(function() {
      console.log("Successfully deleted user");
      res.redirect('/users');
    })
    .catch(function(error) {
      console.log("Error deleting user:", error);
    });
});


module.exports = router;

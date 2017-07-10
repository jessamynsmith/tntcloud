var express = require('express');
var router = express.Router();
var passport = require("passport");
var firebase = require("../private/firebase/firebase");

/*******************************************************************************
 * Home Page
 ******************************************************************************/
router.get('/', function(req, res, next) {
  req.session.errors = null;

  res.render('index', { error: req.flash('error'), isFrontPage: true });
});

/*******************************************************************************
 * Login Form
 ******************************************************************************/
router.post('/login', passport.authenticate('local', { failureRedirect: '/', failureFlash: true }), function(req, res) {
    res.redirect('/core-warranty');
});


/*******************************************************************************
 * Logout Form
 ******************************************************************************/
router.post('/logout', function(req, res) {
  // Remove user from list of logged-in users (used for refreshing auth tokens).
  // Would be nice if this could be done directly from the sessions.
  var userIndex = req.app.locals.loggedInUsers.indexOf(req.user.uid);
  if (userIndex > -1) {
    req.app.locals.loggedInUsers.splice(userIndex, 1);
  }
  firebase.auth().signOut();
  req.logout();

  res.redirect('/');
});


/*******************************************************************************
 * Password Reset Form
 ******************************************************************************/
router.post('/password-reset', function(req, res){
    var email = req.body.emailPasswordReset;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert('Password Reset Email Sent!');
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/invalid-email') {
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      // console.log(error);
      // [END_EXCLUDE]
    });
    // [END sendpasswordemail];

    res.redirect('/');
});


module.exports = router;

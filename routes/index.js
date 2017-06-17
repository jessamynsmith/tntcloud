var express = require('express');
var router = express.Router();
var firebase = require("../firebase");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { condition: true});
  req.session.errors = null;
});

/*******************************************************************************
 * Login
 ******************************************************************************/
router.post('/login', function(req, res){

	var email = req.body.email;
	var pass = req.body.password;
  
  // Sign in
  firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      var err = "Wrong password.";
      console.log(err);

    } else {
      var err = errorMessage;
    }

    // [END_EXCLUDE]
  });


  /*****************************************************************************
   * Auth State Changed
   * Redirect-loop problems: When this was outside/below this Login if() with
   * redirect command, it would create infinite redirect loop.  Once moved here,
   * solved hours of troubleshooting.
   ****************************************************************************/
  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    // Check if the user exists
    if(firebaseUser) {
      res.redirect('/core-warranty');
      console.log(firebaseUser);
      // Redirect upon user login
//      window.location.href = `/dispatch/`;
    }
  });
});
/** Login End ****************************************************************/


/*******************************************************************************
 * Logout
 ******************************************************************************/
router.post('/logout', function(req, res){
  firebase.auth().signOut();

  res.redirect('/');
});
/** Logout End ****************************************************************/

/*******************************************************************************
 * Password Reset
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
        document.getElementById('errorMessage').innerHTML = "Enter your correct email address to receive a password reset email.";
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END sendpasswordemail];

    res.redirect('/');
});
/** Logout End ****************************************************************/


module.exports = router;

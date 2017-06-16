var express = require('express');
var router = express.Router();
/*******************************************************************************
 * Firebase Initialize
 ******************************************************************************/
 var firebase = require("../firebase");

// var firebaseAuth = require("../firebase-auth");

/** Firebase End **************************************************************/


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  req.session.errors = null;
});

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
      document.getElementById('errorMessage').innerHTML = "Wrong password.";
    } else {
      document.getElementById('errorMessage').innerHTML = errorMessage;
    }
    console.log(error);
    // [END_EXCLUDE]
  });

  res.redirect('/core-warranty');
  
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
      console.log(firebaseUser);
      // Redirect upon user login
//      window.location.href = `/dispatch/`;
    }
  });

});


module.exports = router;

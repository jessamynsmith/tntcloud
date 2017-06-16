
/*******************************************************************************
 * SignUp
 ******************************************************************************/
// Check if Signup button exists before adding listener, otherwise error problems
if(btnSignUp) {
  // Add signup event
  btnSignUp.addEventListener('click', e => {
     // Get email adn pass
     // TODO: Check 4 Real Email
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });
}


/*******************************************************************************
 * Auth State Changed
 ******************************************************************************/
// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  // Check if the user exists
  if(firebaseUser) {
    console.log(firebaseUser);
  } else {
    console.log('not logged in');
    // If user is on non root page, hide logout button since they are logged out
    if(btnLogout) {
      btnLogout.classList.add('hide');
    }
  }
});

/*******************************************************************************
 * Password Reset
 ******************************************************************************/

const btnPasswordReset = document.getElementById('btnPasswordReset');

// Check if password-reset button exists before adding listener, otherwise error problems
if(btnPasswordReset) {
  btnPasswordReset.addEventListener('click', sendPasswordReset, false);
}

function sendPasswordReset() {
  var email = txtEmail.value;
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
}
/** End Password Reset ********************************************************/

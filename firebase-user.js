
//Get Elements
const loginBox = document.getElementById('loginBox');
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('sign-out-button');

/*******************************************************************************
 * Login + Event Listeners
 ******************************************************************************/
// Check if Login box exists before adding listeners, otherwise error problems
if(loginBox) {
    // Password: Add event to Password Field: On Keypress Enter
  txtPassword.addEventListener('keypress', e => {
    var key = e.which || e.keyCode;
    if (key === 13) {
      goLogin();
    }
  });
  // Email: Add event to Email Field: On Keypress Enter
  txtEmail.addEventListener('keypress', e => {
    var key = e.which || e.keyCode;
    if (key === 13) {
      goLogin();
    }
  });
  // Button: Add event to Login Button: On Click
  btnLogin.addEventListener('click', e => {
    goLogin();
  });
  // Button: Add event to Login Button: On Keypress
  btnLogin.addEventListener('keypress', e => {
    goLogin();
  });
  /*****************************************************************************
   * Login Execute
   ****************************************************************************/
  function goLogin() {
    //Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    if (email.length < 4) {
      document.getElementById('errorMessage').innerHTML = "Please enter an email address.";
      return;
    }
    if (pass.length < 4) {
      document.getElementById('errorMessage').innerHTML = "Please enter a password.";
      return;
    }
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
  }
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
      // Redirect upon user login
      window.location.href = `/dispatch/`;
    }
  });
}
/** End Login + Event Listeners ***********************************************/

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
 * Logout
 ******************************************************************************/
// Check if logout button exists before adding listener, otherwise error problems
if(btnLogout) {
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    window.location.href = `/`;
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

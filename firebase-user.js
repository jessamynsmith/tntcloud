
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

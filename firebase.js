/*******************************************************************************
 * Firebase Initialize
 ******************************************************************************/
 var firebase = require("firebase");

 // Initialize Firebase
 // TODO: Replace with your project's customized code snippet
 var config = {
   apiKey: "AIzaSyC7ARZ2iEIz23_gMPKW3qxDSvuKmWrsXBQ",
   authDomain: "tnt-dispatch.firebaseapp.com",
   databaseURL: "https://tnt-dispatch.firebaseio.com",
 };
 firebase.initializeApp(config);

/** Firebase End **************************************************************/
/**
 * The ID of the currently signed-in User. We keep track of this to detect Auth state change events that are just
 * programmatic token refresh but not a User status change.
 */

/*******************************************************************************
 * User Email Display
 ******************************************************************************/
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("user IS signed in", user.uid);
  } else {
    console.log("no user signed in");
  }
});

module.exports = firebase;

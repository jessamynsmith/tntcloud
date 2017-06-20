
/*******************************************************************************
 * Firebase Initialize
 ******************************************************************************/
 var firebaseUser = require("firebase");


/*******************************************************************************
 * Auth State Changed
 ******************************************************************************/
firebaseUser.auth().onAuthStateChanged(function(user) {
 if (user) {
   user.uid;
   user.email;
   console.log("user IS signed in, message fro Firebase-User.Js ", user.uid, user.email);
 } else {
   console.log("no user signed in");
 }
});

module.exports = firebaseUser;

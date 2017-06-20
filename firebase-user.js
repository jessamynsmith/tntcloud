
/*******************************************************************************
 * Firebase Initialize
 ******************************************************************************/
var firebaseUser = require("firebase");

var fbUser = {};

/*******************************************************************************
 * Auth State Changed
 ******************************************************************************/
firebaseUser.auth().onAuthStateChanged(function(user) {
fbUser = user;
 if (user) {
//   console.log("user IS signed in, message from Firebase-User.Js ", user.uid, user.email);
 } else {
   console.log("no user signed in");
 }
});

module.exports = {
  getUser: function() {
    return fbUser;
  }
};

var firebaseUser = require("firebase");

// Set empty variable so it's available globally
var fbUser = {};

/*******************************************************************************
 * Auth State Changed
 ******************************************************************************/
firebaseUser.auth().onAuthStateChanged(function(user) {
  // Get 'user' from onAuthStateChanged and set to above fbUser
  fbUser = user;
});

// getUser is used in app.js so user is available globally with .locals
module.exports = {
  getUser: function() {
    return fbUser;
  }
};

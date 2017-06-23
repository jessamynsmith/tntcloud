var firebase = require("firebase");
var promise = require("promise");

// Set empty variable so it's available globally
var fbUser = {};
var dbRef = firebase.database().ref();
var userRole = '';
/*******************************************************************************
 * Auth State Changed: Get Firebase UID
 ******************************************************************************/
firebase.auth().onAuthStateChanged(function(user) {
  // Get 'user' from onAuthStateChanged and set to above fbUser
  fbUser = user;
  // If there is no user, clear the role, for security purposes so roles do not get switched up between sessions
  if (!user) {
    userRole = '';
  }
});

/*******************************************************************************
 * Get User Role Realtime Database User Role Value
 ******************************************************************************/
module.exports.getRole = function() {
  return new promise(function (resolve, reject) {
    // userRole is empty, and empty strings are FALSE
    // checking if userRole because getRole() could have already been called and gotten Role using below dfRef fb stuff....
    // we don't want to continue to use the below code for round trips to firebase if unnecessary, because it slows things down
    if (userRole) {
      resolve(userRole);
    }
    // This case should rarely be hit, as the onAuthStateChanged handles populating fbUser
    // https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user
    if (!fbUser) {
      fbUser = firebase.auth().currentUser;
    }

    // If there is still no user (could be not logged in or still initializing)
    if (!fbUser) {
      userRole = '';
      resolve(userRole);
    }

    dbRef.child('/users/' + fbUser.uid + '/role').once('value').then(function(snapshot) {
      userRole = snapshot.val();
      resolve(userRole);
      // console.log("User role ", userRole);
    }).catch(function(error) {
      resolve('');
    });
  });
}

// Export function that contains the whole firebase user
// Need to export a function, not just a variable because I need the value to be updated
module.exports.getUser = function() {
  return fbUser;
}

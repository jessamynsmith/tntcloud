var firebase = require("firebase");
var promise = require("promise");
var admin = require("firebase-admin")

// Set empty variable so it's available globally
var fbUser = {};
var dbRef = firebase.database().ref();
var userRole = '';
var authToken = null;
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

  if (user) {

    var uid = fbUser.uid;

    admin.auth().createCustomToken(uid)
      .then(function(customToken) {
        // Send token back to client
        authToken = customToken;
        console.log("Token onAuthStateChanged ", authToken);
      })
      .catch(function(error) {
        console.log("Error creating custom token:", error);
      });
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
module.exports.getAuthToken = function() {
  return authToken;
}

/******************************************************************************/
function generateAuthToken() {
    user = firebase.auth().currentUser;
    // Get 'user' from onAuthStateChanged and set to above fbUser
    if (user) {
      var uid = fbUser.uid;

      admin.auth().createCustomToken(uid)
        .then(function(customToken) {
          // Send token back to client
          authToken = customToken;
          console.log("Token generateAuthToken ", authToken);
        })
        .catch(function(error) {
          console.log("Error creating custom token:", error);
        });
    }
}

setInterval(generateAuthToken, 3000000);

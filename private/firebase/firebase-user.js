var firebase = require("firebase");
var promise = require("promise");
var admin = require("firebase-admin");

// Set empty variable so it's available globally
var dbRef = firebase.database().ref();

/*******************************************************************************
 * Token Auth Generate: Re-Authenticate Firebase Front-end every 50 Minutes
 ******************************************************************************/
// TODO how to handle this with sessions? Maybe regen for every logged-in user?
function generateAuthToken() {
    var user = firebase.auth().currentUser;
    // Get 'user' from onAuthStateChanged and set to above fbUser
    if (user) {
      var uid = user.uid;

      admin.auth().createCustomToken(uid)
        .then(function(customToken) {
          // Send token back to client
          console.log("Token generateAuthToken ", customToken);
        })
        .catch(function(error) {
          console.log("Error creating custom token:", error);
        });
    }
}
// Call Function every Three-million milliseconds = 50 minutes (setInterval = Node timer)
// https://nodejs.org/api/timers.html
setInterval(generateAuthToken, 3000000);

/*******************************************************************************
 * User Role Value: Get from Realtime Database
 ******************************************************************************/
module.exports.getRole = function(user) {
  return new promise(function (resolve, reject) {
    // This case should rarely be hit, as the onAuthStateChanged handles populating fbUser
    // https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user
    if (!user) {
      resolve('');
    }
    // Get User Role Value with Firebase UID key that was saved into /users/
    dbRef.child('/users/' + user.uid + '/role').once('value').then(function(snapshot) {
      resolve(snapshot.val());
    }).catch(function(error) {
      resolve('');
    });
  });
};

// Export function that contains the whole firebase user
// Need to export a function, not just a variable because I need the value to be updated
module.exports.getAuthToken = function(user) {
  return new promise(function (resolve, reject) {
    admin.auth().createCustomToken(user.uid)
      .then(function (customToken) {
        // Send token back to client
        console.log("Token generateAuthToken ", customToken);
        resolve(customToken);
      })
      .catch(function (error) {
        console.log("Error creating custom token:", error);
        resolve('');
      });
  });
};

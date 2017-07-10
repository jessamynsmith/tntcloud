var firebase = require("firebase");
var promise = require("promise");
var admin = require("firebase-admin");

// Set empty variable so it's available globally
var dbRef = firebase.database().ref();

/*******************************************************************************
 * Token Auth Generate: Re-Authenticate Firebase Front-end every 50 Minutes
 ******************************************************************************/
module.exports.refreshAuthTokens = function(uids) {
  console.log('Refreshing auth tokens');
  for (var i = 0; i < uids.length; i++) {
    var uid = uids[i];

    admin.auth().createCustomToken(uid)
      .then(function(customToken) {
        // Send token back to client
        console.log("Token generateAuthToken ", customToken);
      })
      .catch(function(error) {
        console.log("Error creating custom token:", error);
      });
  }
};

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

// Get an auth token for a user
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

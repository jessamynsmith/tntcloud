var firebase = require("firebase");
var promise = require("promise");

// Set empty variable so it's available globally
var fbUser = {};
var dbRef = firebase.database().ref();
var userRole = '';
/*******************************************************************************
 * Auth State Changed
 ******************************************************************************/
firebase.auth().onAuthStateChanged(function(user) {
  // Get 'user' from onAuthStateChanged and set to above fbUser
  if (user) {
    fbUser = user;
    console.log("firebase-user.js ", fbUser.uid);
  } else {
    // If there is no user, clear the role
    userRole = '';
  }

/*
  if (fbUser) {
    dbRef.child('/users/' + fbUser.uid + '/role').once('value').then(function(snapshot) {
      userRole = snapshot.val();
      // console.log("User role ", userRole);
    });
  }
  */
});
/******************************************************************************/

module.exports.getRole = function() {
  return new promise(function (resolve, reject) {
    if (userRole) {
      resolve(userRole);
    }

    // This case should rarely be hit, as the onAuthStateChanged handles populating fbUser
    if (!fbUser.uid) {
      user = firebase.auth().currentUser;
      if (user) {
        fbUser = user;
      }
    }

    // If there is still no user (could be not logged in or still initializing)
    if (!fbUser.uid) {
      resolve('');
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

module.exports.getUser = function () {
  return fbUser;
}

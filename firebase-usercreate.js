var firebase = require("firebase");
var firebaseAdmin = require("firebase-admin");

firebaseAdmin.auth().createUser({
  email: "user@example.com",
  emailVerified: false,
  password: "secretPassword",
  disabled: false
})
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });

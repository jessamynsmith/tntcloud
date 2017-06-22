/*******************************************************************************
 * Firebase Admin Initialize
 ******************************************************************************/
var firebase = require("firebase");
var admin = require("firebase-admin");

var serviceAccount = require("./tnt-cloud-5d440-firebase-adminsdk-4aa5y-e87b4483a9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tnt-cloud-5d440.firebaseio.com"
});

module.exports = admin;

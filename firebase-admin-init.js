/*******************************************************************************
 * Firebase Admin Initialize
 ******************************************************************************/
var firebase = require("firebase");
var admin = require("firebase-admin");

var serviceAccount = require("./tnt-dispatch-firebase-adminsdk-wdp26-a9969d5abc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tnt-dispatch.firebaseio.com"
});

module.exports = admin;

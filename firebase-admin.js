/*******************************************************************************
 * Firebase Admin Initialize
 ******************************************************************************/

var firebaseAdmin = require("firebase-admin");

var serviceAccount = require("tnt-dispatch-firebase-adminsdk-wdp26-a9969d5abc.json");

// Initialize Firebase Admin
var config = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tnt-dispatch.firebaseio.com"
};
firebaseAdmin.initializeApp(config);

module.exports = firebaseAdmin;

/*******************************************************************************
 * Firebase Initialize
 ******************************************************************************/
 var firebase = require("firebase");

 // Initialize Firebase
 // TODO: Replace with your project's customized code snippet
 var config = {
   apiKey: "AIzaSyC7ARZ2iEIz23_gMPKW3qxDSvuKmWrsXBQ",
   authDomain: "tnt-dispatch.firebaseapp.com",
   databaseURL: "https://tnt-dispatch.firebaseio.com",
 };
 firebase.initializeApp(config);

/** Firebase End **************************************************************/

module.exports = firebase;

/*******************************************************************************
 * Firebase Initialize
 ******************************************************************************/
 var gotFirebase = require("firebase");

 // Initialize Firebase
 // TODO: Replace with your project's customized code snippet
 var config = {
   apiKey: "AIzaSyC7ARZ2iEIz23_gMPKW3qxDSvuKmWrsXBQ",
   authDomain: "tnt-dispatch.firebaseapp.com",
   databaseURL: "https://tnt-dispatch.firebaseio.com",
 };
 gotFirebase.initializeApp(config);

/** Firebase End **************************************************************/

module.exports = gotFirebase;

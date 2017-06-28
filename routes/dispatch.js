var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var mw = require('../middleware');
// firebaseUser required for authToken
var firebaseUser = require("../firebase-user");
var dbRef = firebase.database().ref();

/*******************************************************************************
 * Core Warranty: Navigation
 ******************************************************************************/
var navDispatch =
  `<div class="">
    <a href="/dispatch/history" class="button" style="margin: .5rem .75rem .5rem .5rem;">History</a>
    <a href="/dispatch/dispatching" class="button" style="margin: .5rem .75rem;">Dispatching</a>
    <a href="/dispatch/create-request" class="button alert" style="margin: .5rem .75rem;">Create Request</a>
  </div>`;

/* Root Route */
// this router is for /dispatch dir, see app.js for initializer
router.get('/', function(req, res, next) {
  var user = req.app.locals.user;

  /*****************************************************************************
  * authToken: send to front-end client for front-end authentication
  * (should be moved to middleware)
  *****************************************************************************/
  var authToken = firebaseUser.getAuthToken();
  res.cookie('fb-auth-token', authToken, { httpOnly: false });
  /* end authToken ************************************************************/

  res.render('dispatch/dispatch', { navDispatch: navDispatch });
});


// Subroute
router.get('/history', function(req, res, next) {
  var user = req.app.locals.user;

  res.render('dispatch/history', { navDispatch: navDispatch });
});


// Subroute
router.get('/dispatching', function(req, res, next) {
  var user = req.app.locals.user;

  /*****************************************************************************
  * authToken: send to front-end client for front-end authentication
  * (should be moved to middleware)
  *****************************************************************************/
  var authToken = firebaseUser.getAuthToken();
  res.cookie('fb-auth-token', authToken, { httpOnly: false });
  /* end authToken ************************************************************/

  /*****************************************************************************
   * Data for Handlebars
  *****************************************************************************/
  dbRef.child('dispatch').once('value', gotData);
  // global variable so warranty data can be accessed after the function
  var templateData;

  function gotData(data) {
    // access data values
    templateData = data.val();
    // Question) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // Answer) because the page render will happen faster than the data collection, so need to render to template after data collected
    // handlebars object: templateData: templateData === anyName: variableName
    res.render('dispatch/dispatching', { dispatchData: templateData, navDispatch: navDispatch });
  };
});


// Subroute
router.get('/create-request', function(req, res, next) {
  var user = req.app.locals.user;

  /*****************************************************************************
  * authToken: send to front-end client for front-end authentication
  * (should be moved to middleware)
  *****************************************************************************/
  var authToken = firebaseUser.getAuthToken();
  res.cookie('fb-auth-token', authToken, { httpOnly: false });
  /* end authToken ************************************************************/

  res.render('dispatch/create-request', { navDispatch: navDispatch });
});


module.exports = router;

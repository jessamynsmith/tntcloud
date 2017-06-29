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
  `<div class="section-nav dispatch">
    <a href="/dispatch/history" class="button" style="margin: .5rem .75rem .5rem .5rem;">History</a>
    <a href="/dispatch/dispatching" class="button" style="margin: .5rem .75rem;">Dispatching</a>
    <a href="/dispatch/create-request" class="button alert" style="margin: .5rem .75rem;">Create Request</a>
  </div>`;

// Dispatch root 
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


// History
router.get('/history', function(req, res, next) {
  var user = req.app.locals.user;

  /*****************************************************************************
  * authToken: send to front-end client for front-end authentication
  * (should be moved to middleware)
  *****************************************************************************/
  var authToken = firebaseUser.getAuthToken();
  res.cookie('fb-auth-token', authToken, { httpOnly: false });
  /* end authToken ************************************************************/

  res.render('dispatch/history', { navDispatch: navDispatch });
});


// Dispatching
router.get('/dispatching', mw.userRole, function(req, res, next) {
  var user = req.app.locals.user;
  var isAdmin = req.app.locals.userRole === 'admin';
  /*****************************************************************************
  * Cookies
  *****************************************************************************/
  // authToken cookie: send to front-end client for front-end authentication
  var authToken = firebaseUser.getAuthToken();
  res.cookie('fb-auth-token', authToken, { httpOnly: false });
  // userRole cookie: send to front-end for userRole restrictions on public javascripts
  res.cookie('userRole', req.app.locals.userRole, { httpOnly: false });
  /** End Cookies *************************************************************/

  res.render('dispatch/dispatching', { isAdmin: isAdmin, navDispatch: navDispatch });
});


// Create Request
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

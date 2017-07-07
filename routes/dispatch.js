var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var mw = require('../middleware');
// firebaseUser required for authToken
var firebaseUser = require("../private/firebase/firebase-user");
var dbRef = firebase.database().ref();

/*******************************************************************************
 * Core Warranty: Navigation
 ******************************************************************************/
var navDispatch =
  `<div class="section-nav dispatch">
    <a href="/dispatch/history" class="button" style="margin: .5rem .75rem .5rem .5rem;">History</a>
    <a href="/dispatch/dispatching" class="button" style="margin: .5rem .75rem;">Dispatching</a>
  </div>`;
var navDispatchCreateRequest =
  `<div class="section-nav dispatch">
    <a href="/dispatch/history" class="button" style="margin: .5rem .75rem .5rem .5rem;">History</a>
    <a href="/dispatch/dispatching" class="button" style="margin: .5rem .75rem;">Dispatching</a>
    <button title="actionRequestCreate" onClick="return requestFormLoad(this.title)" class="button alert" data-open="requestCreate" style="margin: .5rem .75rem;">Create Request</button>
  </div>`;

/*******************************************************************************
 * Root path
 ******************************************************************************/
// this router is for /dispatch dir, see app.js for initializer
router.get('/', function(req, res, next) {
  var user = req.app.locals.user;
  // display name only needs to be added to the first route they hit after login, stays in variable thereafter
  var displayName = req.app.locals.displayName; // mw 'loggedIn'

  /*****************************************************************************
  * authToken: send to front-end client for front-end authentication
  * (should be moved to middleware)
  *****************************************************************************/
  var authToken = firebaseUser.getAuthToken();
  res.cookie('fb-auth-token', authToken, { httpOnly: false });
  /* end authToken ************************************************************/

  res.render('dispatch/dispatch', { displayName: displayName, navDispatch: navDispatch });
});


/*******************************************************************************
 * History Page
 ******************************************************************************/
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


/*******************************************************************************
 * Dispatching Page
 ******************************************************************************/
router.get('/dispatching', mw.userRole, function(req, res, next) {
  // global user variables from middleware
  var user = req.app.locals.user; // mw 'loggedIn'

  var isAdmin = req.app.locals.userRole === 'admin'; // mw 'userRole'
  /*****************************************************************************
  * Cookies
  *****************************************************************************/
  // authToken cookie: send to front-end client for front-end authentication
  var authToken = firebaseUser.getAuthToken();
  res.cookie('fb-auth-token', authToken, { httpOnly: false });
  // userRole cookie: send to front-end for userRole restrictions on public javascripts
  res.cookie('userRole', req.app.locals.userRole, { httpOnly: false });
  /** End Cookies *************************************************************/

  res.render('dispatch/dispatching', { isAdmin: isAdmin, navDispatch: navDispatchCreateRequest });
});


module.exports = router;

var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var mw = require('../middleware');

var firebaseUser = require("../firebase-user");

/*******************************************************************************
 * Core Warranty: Navigation
 ******************************************************************************/
var navDispatch =
  `<div class="">
    <a href="/dispatch/history" class="button" style="margin: .5rem .75rem .5rem .5rem;">History</a>
    <a href="/dispatch/dispatching" class="button" style="margin: .5rem .75rem;">Dispatching</a>
    <a href="/dispatch/create-request" class="button alert" style="margin: .5rem .75rem;">Create Request</a>
  </div>`;

/* GET users listing. */
// this router is for /dispatch dir, see app.js for initializer
router.get('/', function(req, res, next) {
  var user = req.app.locals.user;

  res.render('dispatch/dispatch', { navDispatch: navDispatch });
});


// this is a subroute
router.get('/history', function(req, res, next) {
  var user = req.app.locals.user;

  res.render('dispatch/history', { navDispatch: navDispatch });
});


// this is a subroute
router.get('/dispatching', function(req, res, next) {
  var user = req.app.locals.user;

  res.render('dispatch/dispatching', { navDispatch: navDispatch });
});


// this is a subroute
router.get('/create-request', function(req, res, next) {
  var user = req.app.locals.user;

  var authToken = firebaseUser.getAuthToken();
  console.log("Dispatch token ", authToken);
  res.cookie('fb-auth-token', authToken, { httpOnly: false });

  res.render('dispatch/create-request', { navDispatch: navDispatch });
});


module.exports = router;

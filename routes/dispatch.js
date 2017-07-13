var express = require('express');
var router = express.Router();
var mw = require('../middleware');

/*******************************************************************************
 * Core Warranty: Navigation
 ******************************************************************************/
var branchSelector =
    `<div class="input-group" style="width: auto; display:inline-block;">
      <select id="selectBranch" class="input-group-field" style="width: auto; display:inline-block;" name="selectBranch">
        <option value="allBranches">All Branches</option>
        <option value="JAX">JAX</option>
        <option value="NFWS">NFWS</option>
        <option value="LC">LC</option>
        <option value="WC">WC</option>
        <option value="440">440</option>
      </select>
    </div>`;

var navDispatch =
  `<div class="section-nav dispatch">
    <a href="/dispatch/history" class="button" style="margin: .5rem .75rem .5rem .5rem;">History</a>
    <a href="/dispatch/dispatching" class="button" style="margin: .5rem .75rem;">Dispatching</a>
    ${branchSelector}
  </div>`;

var navDispatchCreateRequest =
  `<div class="section-nav dispatch">
    <a href="/dispatch/history" class="button" style="margin: .5rem .75rem .5rem .5rem;">History</a>
    <a href="/dispatch/dispatching" class="button" style="margin: .5rem .75rem;">Dispatching</a>
    ${branchSelector}
    <button title="actionRequestCreate" class="button alert" data-open="requestCreate" style="margin: .5rem .75rem;">Create Request</button>
  </div>`;

/*******************************************************************************
 * Dispatch Root Page
 ******************************************************************************/
// this router is for /dispatch dir, see app.js for initializer
router.get('/', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  res.render('dispatch/dispatch', { displayName: displayName, isAdmin: isAdmin, navDispatch: navDispatch });
});


/*******************************************************************************
 * History Page
 ******************************************************************************/
router.get('/history', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  res.render('dispatch/history', { displayName: displayName, isAdmin: isAdmin, navDispatch: navDispatch });
});


/*******************************************************************************
 * Dispatching Page
 ******************************************************************************/
router.get('/dispatching', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';

  var userUID = req.user.uid;
  console.log("dispatch.js UID ", userUID);

  var showDriverInput = false;
  if (isAdmin) {
    showDriverInput = true;
  }

  res.render('dispatch/dispatching', { displayName: displayName, isAdmin: isAdmin, showDriverInput: showDriverInput, navDispatch: navDispatchCreateRequest });
});


/*******************************************************************************
 * Dispatching Page: JAX
 ******************************************************************************/
router.get('/dispatching/jax', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  // isBranch for conditionally loading javascript branch file
  var isJAX = true;

  var userUID = req.user.uid;
  console.log("dispatch.js UID ", userUID);

  var showDriverInput = false;
  if (isAdmin) {
    showDriverInput = true;
  }

  res.render('dispatch/dispatching', { isJAX: isJAX, displayName: displayName, isAdmin: isAdmin, showDriverInput: showDriverInput, navDispatch: navDispatchCreateRequest });
});


/*******************************************************************************
 * Dispatching Page: NFWS
 ******************************************************************************/
router.get('/dispatching/nfws', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  // isBranch for conditionally loading javascript branch file
  var isNFWS = true;

  var userUID = req.user.uid;
  console.log("dispatch.js UID ", userUID);

  var showDriverInput = false;
  if (isAdmin) {
    showDriverInput = true;
  }

  res.render('dispatch/dispatching', { isNFWS: isNFWS, displayName: displayName, isAdmin: isAdmin, showDriverInput: showDriverInput, navDispatch: navDispatchCreateRequest });
});


/*******************************************************************************
 * Dispatching Page: LC
 ******************************************************************************/
router.get('/dispatching/lc', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  // isBranch for conditionally loading javascript branch file
  var isLC = true;

  var userUID = req.user.uid;
  console.log("dispatch.js UID ", userUID);

  var showDriverInput = false;
  if (isAdmin) {
    showDriverInput = true;
  }

  res.render('dispatch/dispatching', { isLC: isLC, displayName: displayName, isAdmin: isAdmin, showDriverInput: showDriverInput, navDispatch: navDispatchCreateRequest });
});


/*******************************************************************************
 * Dispatching Page: WC
 ******************************************************************************/
router.get('/dispatching/wc', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  // isBranch for conditionally loading javascript branch file
  var isWC = true;

  var userUID = req.user.uid;
  console.log("dispatch.js UID ", userUID);

  var showDriverInput = false;
  if (isAdmin) {
    showDriverInput = true;
  }

  res.render('dispatch/dispatching', { isWC: isWC, displayName: displayName, isAdmin: isAdmin, showDriverInput: showDriverInput, navDispatch: navDispatchCreateRequest });
});


/*******************************************************************************
 * Dispatching Page: 440
 ******************************************************************************/
router.get('/dispatching/440', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  // isBranch for conditionally loading javascript branch file
  var is440 = true;

  var userUID = req.user.uid;
  console.log("dispatch.js UID ", userUID);

  var showDriverInput = false;
  if (isAdmin) {
    showDriverInput = true;
  }

  res.render('dispatch/dispatching', { is440: is440, displayName: displayName, isAdmin: isAdmin, showDriverInput: showDriverInput, navDispatch: navDispatchCreateRequest });
});


module.exports = router;

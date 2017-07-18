var express = require('express');
var router = express.Router();
var mw = require('../middleware');

/*******************************************************************************
 * Core Warranty: Navigation
 ******************************************************************************/
var branchSelector =
    `<li id="selectBranch-wrapper" class="input-group">
      <select id="selectBranch" class="input-group-field" name="selectBranch">
        <option value="allBranches">All Branches</option>
        <option value="JAX">JAX</option>
        <option value="NFWS">NFWS</option>
        <option value="LC">LC</option>
        <option value="WC">WC</option>
        <option value="440">440</option>
      </select>
    </li>`;

var navDispatch =
  `<ul class="menu">
    <li><a href="/dispatch/dispatching" class="">Dispatching</a></li>
    <li><a href="/dispatch/history" class="">History</a></li>
    ${branchSelector}
  </ul>`;

var navDispatchCreateRequest =
  `<ul class="menu">
    <li><a href="/dispatch/dispatching" class="">Dispatching</a></li>
    <li><a href="/dispatch/history" class="">History</a></li>
    ${branchSelector}
    <li class="button-parent"><button title="actionRequestCreate" class="button alert" data-open="requestCreate">Create Request</button></li>
  </ul>`;

/*******************************************************************************
 * Dispatch Root Page
 ******************************************************************************/
// this router is for /dispatch dir, see app.js for initializer
router.get('/', mw.userRole, function(req, res, next) {
  var title = "Dispatch";
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  res.render('dispatch/dispatch', { title: title, displayName: displayName, isAdmin: isAdmin, navDispatch: navDispatch });
});


/*******************************************************************************
 * History Page
 ******************************************************************************/
router.get('/history', mw.userRole, function(req, res, next) {
  var title = "Dispatch History";
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  res.render('dispatch/history', { title: title, displayName: displayName, isAdmin: isAdmin, navDispatch: navDispatch });
});


/*******************************************************************************
 * Dispatching Page
 ******************************************************************************/
router.get('/dispatching', mw.userRole, function(req, res, next) {
  var title = "Dispatching All Branches";
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';

  var userUID = req.user.uid;
  console.log("dispatch.js UID ", userUID);

  var showDriverInput = false;
  var showReceivedConfirm = false;
  if (isAdmin) {
    showDriverInput = true;
    showReceivedConfirm = true;
  }

  res.render('dispatch/dispatching', { title: title, displayName: displayName,
    showDriverInput: showDriverInput, showReceivedConfirm: showReceivedConfirm,
    navDispatch: navDispatchCreateRequest });
});


/*******************************************************************************
 * Dispatching Page: JAX
 ******************************************************************************/
router.get('/dispatching/jax', mw.userRole, function(req, res, next) {
  var title = "Dispatching JAX";
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  var isDispatchJax = req.app.locals.userRole === 'dispatch_jax';
  // isBranch for conditionally loading javascript branch file
  var isJAX = true;

  var userUID = req.user.uid;
  console.log("dispatch.js UID ", userUID);

  var showDriverInput = false;
  var showReceivedConfirm = false;
  if (isAdmin || isDispatchJax) {
    showDriverInput = true;
    showReceivedConfirm = true;
  }

  res.render('dispatch/dispatching', { title: title, displayName: displayName,
    showDriverInput: showDriverInput, showReceivedConfirm: showReceivedConfirm,
    isJAX: isJAX, isAdmin: isAdmin,
    navDispatch: navDispatchCreateRequest });
});


/*******************************************************************************
 * Dispatching Page: NFWS
 ******************************************************************************/
router.get('/dispatching/nfws', mw.userRole, function(req, res, next) {
  var title = "Dispatching NFWS";
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  var isDispatchNFWS = req.app.locals.userRole === 'dispatch_nfws';
  // isBranch for conditionally loading javascript branch file
  var isNFWS = true;

  var userUID = req.user.uid;
  console.log("dispatch.js UID ", userUID);

  var showDriverInput = false;
  var showReceivedConfirm = false;
  if (isAdmin || isDispatchNFWS) {
    showDriverInput = true;
    showReceivedConfirm = true;
  }

  res.render('dispatch/dispatching', { title: title, displayName: displayName,
    showDriverInput: showDriverInput, showReceivedConfirm: showReceivedConfirm,
    isNFWS: isNFWS, isAdmin: isAdmin,
    navDispatch: navDispatchCreateRequest });
});


/*******************************************************************************
 * Dispatching Page: LC
 ******************************************************************************/
router.get('/dispatching/lc', mw.userRole, function(req, res, next) {
  var title = "Dispatching LC";
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  var isDispatchLC = req.app.locals.userRole === 'dispatch_lc';
  // isBranch for conditionally loading javascript branch file
  var isLC = true;

  var userUID = req.user.uid;
  console.log("dispatch.js UID ", userUID);

  var showDriverInput = false;
  var showReceivedConfirm = false;
  if (isAdmin || isDispatchLC) {
    showDriverInput = true;
    showReceivedConfirm = true;
  }

  res.render('dispatch/dispatching', { title: title, displayName: displayName,
    showDriverInput: showDriverInput, showReceivedConfirm: showReceivedConfirm,
    isLC: isLC, isAdmin: isAdmin,
    navDispatch: navDispatchCreateRequest });
});


/*******************************************************************************
 * Dispatching Page: WC
 ******************************************************************************/
router.get('/dispatching/wc', mw.userRole, function(req, res, next) {
  var title = "Dispatching WC";
  var displayName = req.user.displayName;
  var isDispatchWC = req.app.locals.userRole === 'dispatch_wc';
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  // isBranch for conditionally loading javascript branch file
  var isWC = true;

  var userUID = req.user.uid;
  console.log("dispatch.js UID ", userUID);

  var showDriverInput = false;
  var showReceivedConfirm = false;
  if (isAdmin || isDispatchWC) {
    showDriverInput = true;
    showReceivedConfirm = true;
  }

  res.render('dispatch/dispatching', { title: title, displayName: displayName,
    showDriverInput: showDriverInput, showReceivedConfirm: showReceivedConfirm,
    isWC: isWC, isAdmin: isAdmin,
    navDispatch: navDispatchCreateRequest });
});


/*******************************************************************************
 * Dispatching Page: 440
 ******************************************************************************/
router.get('/dispatching/440', mw.userRole, function(req, res, next) {
  var title = "Dispatching 440";
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  var isDispatch440 = req.app.locals.userRole ='dispatch_440';
  // isBranch for conditionally loading javascript branch file
  var is440 = true;

  var userUID = req.user.uid;
  console.log("dispatch.js UID ", userUID);

  var showDriverInput = false;
  var showReceivedConfirm = false;
  if (isAdmin || isDispatch440) {
    showDriverInput = true;
    showReceivedConfirm = true;
  }

  res.render('dispatch/dispatching', { title: title, displayName: displayName,
    showDriverInput: showDriverInput, showReceivedConfirm: showReceivedConfirm,
    is440: is440, isAdmin: isAdmin,
    navDispatch: navDispatchCreateRequest });
});


module.exports = router;

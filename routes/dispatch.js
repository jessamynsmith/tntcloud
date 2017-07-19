var express = require('express');
var router = express.Router();
var mw = require('../middleware');
var firebase = require("firebase");
var dbRef = firebase.database().ref();

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
    <li><a href="/dispatch/received" class="">Received</a></li>
    ${branchSelector}
  </ul>`;

var navDispatchCreateRequest =
  `<ul class="menu">
    <li><a href="/dispatch/dispatching" class="">Dispatching</a></li>
    <li><a href="/dispatch/received" class="">Received</a></li>
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
 * Received Page
 ******************************************************************************/
router.get('/received', mw.userRole, function(req, res, next) {
  var title = "Received Requests";
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  /*****************************************************************************
   * Data for Handlebars
  *****************************************************************************/
  dbRef.child('dispatch').orderByChild('Status').equalTo('received').once('value', gotData);
  // global variable so warranty data can be accessed after the function
  var templateData;

  function gotData(data) {
    // access data values
    templateData = data.val();
    // Question) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // Answer) because the page render will happen faster than the data collection, so need to render to template after data collected
    // handlebars object: templateData: templateData === anyName: variableName
    res.render('dispatch/received', { title: title, displayName: displayName,
      isAdmin: isAdmin, receivedData: templateData, navDispatch: navDispatch });
  };
});

/*******************************************************************************
 * Received Record Page
 ******************************************************************************/
router.get('/record-received', mw.userRole, function(req, res, next) {
  var title = "View Received Record";
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  /*****************************************************************************
   * Data for Handlebars
  *****************************************************************************/
  // get key from url query parameter '?KEY='
  var key = req.query.KEY;
  // get 'dispatch' data record associated with 'key' value
  dbRef.child('dispatch/' + key).once('value', gotData);

  function gotData(data) {
    // access data values
    templateData = data.val();
    // Question) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // Answer) because the page render will happen faster than the data collection, so need to render to template after data collected
    // handlebars object: templateData: templateData === anyName: variableName
    res.render('dispatch/record-received', { title: title, displayName: displayName,
      isAdmin: isAdmin, templateData: templateData, key: key, navDispatch: navDispatch });
  };
});


/*******************************************************************************
 * Dispatching Page
 ******************************************************************************/
router.get('/dispatching', mw.userRole, function(req, res, next) {
  var title = "Dispatching All Branches";
  var displayName = req.user.displayName;
  var userUID = req.user.uid;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  // isBranch for conditionally loading javascript branch file
  var isAllBranches = true;

  var showDriverInput = false;
  var showReceivedConfirm = false;
  if (isAdmin) {
    showDriverInput = true;
    showReceivedConfirm = true;
  }

  res.render('dispatch/dispatching', { title: title, displayName: displayName,
    showDriverInput: showDriverInput, showReceivedConfirm: showReceivedConfirm,
    isAdmin: isAdmin, isAllBranches: isAllBranches,
    navDispatch: navDispatchCreateRequest });
});


/*******************************************************************************
 * Dispatching Page: JAX
 ******************************************************************************/
router.get('/dispatching/jax', mw.userRole, function(req, res, next) {
  var title = "Dispatching JAX";
  var displayName = req.user.displayName;
  var userUID = req.user.uid;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  var isDispatchRoleJAX = req.app.locals.userRole === 'dispatch_jax';
  // isBranch for conditionally loading javascript branch file
  var isJAX = true;

  var showDriverInput = false;
  var showReceivedConfirm = false;
  if (isAdmin || isDispatchRoleJAX) {
    showDriverInput = true;
    showReceivedConfirm = true;
  }

  res.render('dispatch/dispatching', { title: title, displayName: displayName,
    isAdmin: isAdmin, isJAX: isJAX,
    showDriverInput: showDriverInput, showReceivedConfirm: showReceivedConfirm,
    navDispatch: navDispatchCreateRequest });
});


/*******************************************************************************
 * Dispatching Page: NFWS
 ******************************************************************************/
router.get('/dispatching/nfws', mw.userRole, function(req, res, next) {
  var title = "Dispatching NFWS";
  var displayName = req.user.displayName;
  var userUID = req.user.uid;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  var isDispatchRoleNFWS = req.app.locals.userRole === 'dispatch_nfws';
  // isBranch for conditionally loading javascript branch file
  var isNFWS = true;

  var showDriverInput = false;
  var showReceivedConfirm = false;
  if (isAdmin || isDispatchRoleNFWS) {
    showDriverInput = true;
    showReceivedConfirm = true;
  }

  res.render('dispatch/dispatching', { title: title, displayName: displayName,
    isAdmin: isAdmin, isNFWS: isNFWS,
    showDriverInput: showDriverInput, showReceivedConfirm: showReceivedConfirm,
    navDispatch: navDispatchCreateRequest });
});


/*******************************************************************************
 * Dispatching Page: LC
 ******************************************************************************/
router.get('/dispatching/lc', mw.userRole, function(req, res, next) {
  var title = "Dispatching LC";
  var displayName = req.user.displayName;
  var userUID = req.user.uid;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  var isDispatchRoleLC = req.app.locals.userRole === 'dispatch_lc';
  // isBranch for conditionally loading javascript branch file
  var isLC = true;

  var showDriverInput = false;
  var showReceivedConfirm = false;
  if (isAdmin || isDispatchRoleLC) {
    showDriverInput = true;
    showReceivedConfirm = true;
  }

  res.render('dispatch/dispatching', { title: title, displayName: displayName,
    isAdmin: isAdmin, isLC: isLC,
    showDriverInput: showDriverInput, showReceivedConfirm: showReceivedConfirm,
    navDispatch: navDispatchCreateRequest });
});


/*******************************************************************************
 * Dispatching Page: WC
 ******************************************************************************/
router.get('/dispatching/wc', mw.userRole, function(req, res, next) {
  var title = "Dispatching WC";
  var displayName = req.user.displayName;
  var userUID = req.user.uid;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  var isDispatchRoleWC = req.app.locals.userRole === 'dispatch_wc';
  // isBranch for conditionally loading javascript branch file
  var isWC = true;

  var showDriverInput = false;
  var showReceivedConfirm = false;
  if (isAdmin || isDispatchRoleWC) {
    showDriverInput = true;
    showReceivedConfirm = true;
  }

  res.render('dispatch/dispatching', { title: title, displayName: displayName,
    isAdmin: isAdmin, isWC: isWC,
    showDriverInput: showDriverInput, showReceivedConfirm: showReceivedConfirm,
    navDispatch: navDispatchCreateRequest });
});


/*******************************************************************************
 * Dispatching Page: 440
 ******************************************************************************/
router.get('/dispatching/440', mw.userRole, function(req, res, next) {
  var title = "Dispatching 440";
  var displayName = req.user.displayName;
  var userUID = req.user.uid;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';
  var isBasic = req.app.locals.userRole === 'basic';
  var isDispatchRole440 = req.app.locals.userRole ='dispatch_440';
  // isBranch for conditionally loading javascript branch file
  var is440 = true;

  var showDriverInput = false;
  var showReceivedConfirm = false;
  if (isAdmin || isDispatchRole440) {
    showDriverInput = true;
    showReceivedConfirm = true;
  }

  res.render('dispatch/dispatching', { title: title, displayName: displayName,
    isAdmin: isAdmin, is440: is440,
    showDriverInput: showDriverInput, showReceivedConfirm: showReceivedConfirm,
    navDispatch: navDispatchCreateRequest });
});


module.exports = router;

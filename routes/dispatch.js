var express = require('express');
var router = express.Router();
var mw = require('../middleware');

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
 * Dispatch Root Page
 ******************************************************************************/
// this router is for /dispatch dir, see app.js for initializer
router.get('/', function(req, res, next) {
  var displayName = req.user.displayName;

  res.render('dispatch/dispatch', { displayName: displayName, navDispatch: navDispatch });
});


/*******************************************************************************
 * History Page
 ******************************************************************************/
router.get('/history', function(req, res, next) {
  var displayName = req.user.displayName;

  res.render('dispatch/history', { displayName: displayName, navDispatch: navDispatch });
});


/*******************************************************************************
 * Dispatching Page
 ******************************************************************************/
router.get('/dispatching', /* mw.userRole, */ function(req, res, next) {
  var displayName = req.user.displayName;
//  var isAdmin = req.app.locals.userRole === 'admin'; // mw 'userRole'

  res.render('dispatch/dispatching', { displayName: displayName, /* isAdmin: isAdmin, */ navDispatch: navDispatchCreateRequest });
});


module.exports = router;

var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var mw = require('../middleware');
var dbRef = firebase.database().ref();
/*******************************************************************************
 * Core Warranty Home
 ******************************************************************************/
/* Core-warranty route */
// this router is for /core-warranty dir, see app.js for initializer
router.get('/', mw.userRole, function(req, res, next) {
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

//  console.log("core-warranty.js: Got UID here ", req.app.locals.uid);
//  console.log("User Role is ", req.app.locals.userRole);

  res.render('core-warranty/core-warranty', { isAdmin: isAdmin });
});

/*******************************************************************************
 * Create Warranty Form
 ******************************************************************************/
router.get('/create-warranty', function(req, res, next) {
  var user = req.app.locals.user;
  res.render('core-warranty/create-warranty');
});

// Insert Data
// Restrict post capability by applying the middlware from app.js
router.post('/insert-warranty', mw.userRoleAndAdmin, function(req, res, next) {
  // get the form fields data
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  // Use firebase from app.js and set child db node
  var warrantyRef = req.app.locals.dbRef.child('warranty');
  warrantyRef.push(item);
  // url redirect after post
  res.redirect('/core-warranty');
});

/*******************************************************************************
 * Create Core
 ******************************************************************************/
router.get('/create-core', function(req, res, next) {
  res.render('core-warranty/create-core');
});

// Insert Data
router.post('/insert-core', function(req, res, next) {
  // get the form fields data
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  // Use firebase from app.js and set child db node
  var coreRef = req.app.locals.dbRef.child('core');
  coreRef.push(item);
  // url redirect after post
  res.redirect('/core-warranty');
});

/*******************************************************************************
 * List Warranty
 ******************************************************************************/
router.get('/list-warranty', mw.userRole, function(req, res, next) {
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  /*****************************************************************************
   * Data for Handlebars
  *****************************************************************************/
  dbRef.once('value', gotData);
  // global variable so warranty data can be accessed after the function
  var templateData;

  function gotData(data) {
    // access data values
    templateData = data.val();

    // 1) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // 2) How to get isAdmin: isAdmin working with the additional warrantyData?  If I add it, warrantyData does not render
    res.render('core-warranty/list-warranty', templateData );
  };
});

/*******************************************************************************
 * List Core
 ******************************************************************************/
router.get('/list-core', mw.userRole, function(req, res, next) {
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  /*****************************************************************************
   * Data for Handlebars
  *****************************************************************************/
  dbRef.once('value', gotData);
  // global variable so warranty data can be accessed after the function
  var templateData;

  function gotData(data) {
    // access data values
    templateData = data.val();

    // 1) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // 2) How to get isAdmin: isAdmin working with the additional warrantyData?  If I add it, warrantyData does not render
    res.render('core-warranty/list-core', templateData );
  };
});


module.exports = router;

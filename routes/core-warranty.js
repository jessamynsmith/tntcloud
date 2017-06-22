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
   * Data for Handlebars + Output HTML for Handlebars
  *****************************************************************************/
  // 'on' is firebase method for keeping live data, and 'value' is saying you want values
/*
  dbRef.child('/warranty/').once('value')
  .then(function(snapshot) {
    userRole = snapshot.val();
    resolve(userRole);
    // console.log("User role ", userRole);
  }).catch(function(error) {
    resolve('');
  });
  console.log("Database Ref ", dbRef);
*/

  dbRef.child('/warranty/').once('value')
  .then((snapshot)=>{
  console.log("Database Ref ", dbRef);

  res.render('core-warranty/list-warranty', { isAdmin: isAdmin });
      // pass the results to our 'index' view ...render
    // i could bind the database query to variable which is then promise...
  });

});


/*******************************************************************************
 * List Core
 ******************************************************************************/
router.get('/list-core', mw.userRole, function(req, res, next) {
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  res.render('core-warranty/list-core', { isAdmin: isAdmin });
});


module.exports = router;

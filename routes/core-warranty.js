var express = require('express');
var router = express.Router();
/*******************************************************************************
 * Firebase Initialize
 ******************************************************************************/
 var firebase = require("../firebase");

 var dbRef = firebase.database().ref('node');

 var warrantyRef = dbRef.child('warranty');
 var coreRef = dbRef.child('core');
/** Firebase End **************************************************************/

var firebaseUser = require("../firebase-user");
// console.log("Firebase User from import ", firebaseUser);

/** Retrieve User Data End ****************************************************/

/* GET users listing. */
// this router is for /core-warranty dir, see app.js for initializer
router.get('/', function(req, res, next) {
  res.render('core-warranty/core-warranty');
  req.session.errors = null;

  var user = firebaseUser.getUser();

  if (user) {
    // User is signed in.
      console.log("user IS signed in", user.uid);
  } else {
    // No user is signed in.
  }



});

/*******************************************************************************
 * Create Warranty
 ******************************************************************************/
router.get('/create-warranty', function(req, res, next) {
  res.render('core-warranty/create-warranty');
  var user = firebaseUser.getUser();

  if (user) {
    // User is signed in.
      console.log("user IS signed in @ create warranty ", user.uid);
  } else {
    // No user is signed in.
  }
});

// Insert Data
router.post('/insert-warranty', function(req, res, next) {
  // get the form fields data
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  // insert
  // i could bind the database query to variable which is then promise...
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

router.post('/insert-core', function(req, res, next) {
  // get the form fields data
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  // insert
  // i could bind the database query to variable which is then promise...
  coreRef.push(item);
  // url redirect after post
  res.redirect('/core-warranty');
});

// this is a subroute of the above / .../users
router.get('/list-warranty', function(req, res, next) {
  res.send('warranty list');
});

// this is a subroute of the above / .../users
router.get('/list-core', function(req, res, next) {
  res.send('List core');
});

module.exports = router;

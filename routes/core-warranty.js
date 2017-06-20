var express = require('express');
var router = express.Router();

/* GET users listing. */
// this router is for /core-warranty dir, see app.js for initializer
router.get('/', function(req, res, next) {
  req.session.errors = null;

    var user = req.app.locals.user;
    // User is signed in.
    console.log("user IS signed in", user.uid);

  res.render('core-warranty/core-warranty');

});

/*******************************************************************************
 * Create Warranty
 ******************************************************************************/
router.get('/create-warranty', function(req, res, next) {
  var user = req.app.locals.user;
  res.render('core-warranty/create-warranty');
});

// Insert Data
router.post('/insert-warranty', function(req, res, next) {
  // get the form fields data
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

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

router.post('/insert-core', function(req, res, next) {
  // get the form fields data
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var coreRef = req.app.locals.dbRef.child('core');
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

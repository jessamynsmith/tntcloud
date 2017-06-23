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
  var warranty = {};

  function gotData(data) {
      // access data values
    var warranty = data.val();
    console.log("Warranty DB Ref ", warranty);

    // pass the results to our 'index' view ...render
    // i could bind the database query to variable which is then promise...
  };
  var templateData = {
    year: '1999',
    article: 'whatever'
  }

  var testData =
  {
    users:
       { '0fHIeLP0ZebpApMz2T5neW1mzgu2': { email: 'test@test.com', role: 'admin' },
         '2nXzWZ8oTTf7uOJ4qcodISofI1k2': { email: 'basic@gmail.com', role: 'basic' },
         I8olhLwiDrQbDLhxEWLjpMkQ1qg2: { email: 'admin@gmail.com', role: 'admin' },
         uFabw5Vuldfa1ZexUjxI4WgKGwD3: { email: 'basictwo@gmail.com', role: 'basic' },
         urWikkKSWYTcle3QzWtSbZIZqD82: { email: 'nilshendrick@gmail.com', role: 'admin' } },
    warranty:
    { '-KlTlm2Gaz8xWXIfoI2b':
      { Date: '05/31/2017',
        RO: '131584' },
     '-KlU_4xdFbDdlwhsLNAT':
      { Date: '05/31/2017',
        RO: 'S-208308' }
    }
  }

  var test = {
    Date: '1999',
    RO: 'whatever'
  }

  res.render('core-warranty/list-warranty', testData );
//  console.log("From Render ", res.render.templateData);
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

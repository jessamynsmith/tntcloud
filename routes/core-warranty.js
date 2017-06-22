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

  console.log("core-warranty.js: Got UID here ", req.app.locals.uid);
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
  dbRef.once('value', gotData, errData);

  function gotData(data) {
    // access data values
    var context = data.val();

    /***************************************
    * Handlebars
    ***************************************/
/*
    var rawTemplate = document.getElementById("rowsTemplate").innerHTML;
    // Node.js is needed if I want to pre-compile templates
    var compiledTemplate = Handlebars.compile(rawTemplate);

    // pass the array data values
    var html = compiledTemplate(context);
    // add html output to ID
    document.getElementById('records-list').innerHTML += html;

    /***************************************
    * Sort initial table by Date
    ***************************************/
    // http://jsfiddle.net/UdvDD/
    var $wrapper = $('.list');

    $wrapper.find('.data-row').sort(function (a, b) {
      return b.dataset.sort - a.dataset.sort;
    })
    .appendTo( $wrapper );

    /***************************************
    * LIST JS = Search and Columns Sort
    ***************************************/
    // <th> 'data-sort' value and <td> 'class' value must match to work
    /* DATE SORT required work-around:
     * (because of Date Turned In format DD/MM/YYY, which would work properly if it was YYYY/MM/DD)
     * The column "Date Turned In" contains data-sort="w-date-server-turned-in"
     * that actually sorts by the DateTimeStampServer column, which is hidden. */
    var options = {
      valueNames: [ 'w-date-server-turned-in', 'w-customer', 'w-description', 'w-failed-part-number', 'w-quantity', 'w-received-by', 'w-ro', 'w-turned-in-by', 'w-vendor', 'w-vin' ]
    };
    var monkeyList = new List('warranty', options);

  } // End gotData function (sort needs to be included in this function)

  function errData(err) {
    console.log('Error!');
    console.log(err);
  }


  res.render('core-warranty/list-warranty', { isAdmin: isAdmin });
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

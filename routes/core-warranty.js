var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var mw = require('../middleware');
var dbRef = firebase.database().ref();

/*******************************************************************************
 * Date/Time
 ******************************************************************************/
var moment = require('moment');
// Server Date/Time https://firebase.google.com/docs/reference/js/firebase.database.ServerValue
const DateTimeStampServer = firebase.database.ServerValue.TIMESTAMP;
let Date = DateTimeStampServer;
Date = moment().format('L'); // Format date with moment.js
let DateTime = moment().format('h:mm:ss A');

/*******************************************************************************
 * Core Warranty Home
 ******************************************************************************/
// this router is for /core-warranty dir, see app.js for initializer
router.get('/', mw.userRole, function(req, res, next) {
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

//  console.log("core-warranty.js: Got UID here ", req.app.locals.uid);
//  console.log("User Role is ", req.app.locals.userRole);

  res.render('core-warranty/core-warranty', { isAdmin: isAdmin });
});

/*******************************************************************************
 * Create Warranty Page
 ******************************************************************************/
router.get('/create-warranty', function(req, res, next) {
  var user = req.app.locals.user;
  res.render('core-warranty/create-warranty');
});

/*******************************************************************************
 * Create Warranty Page: Submit Form
 ******************************************************************************/
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
 * Create Core Page
 ******************************************************************************/
router.get('/create-core', function(req, res, next) {
  /*****************************************************************************
   * Build Employees <options> for <select> drop-down with Employee ID + Name
  *****************************************************************************/
  // ref.on is firebase method for keeping live data, and 'value' is saying you want values
  dbRef.child('/people/').orderByChild('PersonName').once('value', gotData);

  var gotPeople = [];

  function gotData(data) {
    // assign above warranty data to 'warranty'

    data.forEach(function(data) {
      gotPeople.push(data.val());
    });
    // 1) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // 2) How to get isAdmin: isAdmin working with the additional warrantyData?  If I add it, warrantyData does not render
    res.render('core-warranty/create-core', { gotPeople: gotPeople } );
  };
});

/*******************************************************************************
 * Create Core Page: Submit Form
 ******************************************************************************/
router.post('/insert-core', function(req, res, next) {

  // get the form fields data
  var item = {
    DateTimeStampServer: DateTimeStampServer,
    Date: Date,
    DateTime: DateTime,
    Branch: req.body.branch,
    Customer: req.body.customer,
    Description: req.body.description,
    FailedPartNumber: req.body.failedPartNumber,
    Quantity: req.body.quantity,
    RO: req.body.ro,
    TurnedInBy: req.body.turnedInBy,
    ReceivedBy: req.body.receivedBy
  };
  // Get a key for a new core Record
  var newCoreKey = firebase.database().ref().child('core').push().key;

  // write the new core data to the core list
  var updates = {};
  updates['/core/' + newCoreKey] = item;

  // update the new-key-record with the data
  var dbUpdate = req.app.locals.dbRef.update(updates);

  // url redirect after post, include query parameter
  res.redirect('/core-warranty/print-core/?KEY=' + newCoreKey);
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
  dbRef.child('core').once('value', gotData);
  // global variable so warranty data can be accessed after the function
  var templateData;

  function gotData(data) {
    // access data values
    templateData = data.val();
    console.log("Core Data", templateData);

    // 1) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // 2) How to get isAdmin: isAdmin working with the additional warrantyData?  If I add it, warrantyData does not render
    res.render('core-warranty/list-core', { isAdmin: isAdmin, coreData: templateData } );
  };
});

/*******************************************************************************
 * Print Core
 ******************************************************************************/
router.get('/print-core', function(req, res, next) {

  /*****************************************************************************
   * Data for Handlebars
  *****************************************************************************/
  // get key from url query parameter '?KEY='
  var key = req.query.KEY;
  // get 'core' data record associated with 'key' value
  dbRef.child('core/' + key).once('value', gotData);

  function gotData(data) {
    // access data values
    templateData = data.val();
    console.log("Record Data ", templateData);
    res.render('core-warranty/print-core', templateData);
  };
});

/*******************************************************************************
 * View Record Core
 ******************************************************************************/
router.get('/record-core', function(req, res, next) {

  /*****************************************************************************
   * Data for Handlebars
  *****************************************************************************/
  // get key from url query parameter '?KEY='
  var key = req.query.KEY;
  // get 'core' data record associated with 'key' value
  dbRef.child('core/' + key).once('value', gotData);

  function gotData(data) {
    // access data values
    templateData = data.val();
    console.log("Record Data ", templateData);
    res.render('core-warranty/record-core', templateData);
  };
});

module.exports = router;

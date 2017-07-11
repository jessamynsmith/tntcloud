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
 * Core Warranty: Navigation
 ******************************************************************************/
var navCW =
  `<ul class="menu">
    <li><a href="/core-warranty/list-warranty">Warranty</a></li>
    <li><a href="/core-warranty/list-core">Core</a></li>
    <li><a href="/core-warranty/people-list">People</a></li>
  </ul>`;

/*******************************************************************************
 * Core Warranty Home Page
 ******************************************************************************/
// this router is for /core-warranty dir, see app.js for initializer
router.get('/', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  res.render('core-warranty/core-warranty', { displayName: displayName, isAdmin: isAdmin, navCW: navCW });
});

/*******************************************************************************
 * Warranty: Create Record Page
 ******************************************************************************/
router.get('/create-warranty', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  /*****************************************************************************
   * Build Employees <options> for <select> drop-down with Employee ID + Name
  *****************************************************************************/
  // Sort people/PersonName using Firebase
  dbRef.child('/people/').orderByChild('PersonName').once('value', gotData);

  function gotData(data) {
    var templateData = [];

    data.forEach(function(data) {
      templateData.push(data.val());
    });
    // Question) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // Answer) because the page render will happen faster than the data collection, so need to render to template after data collected
    // handlebars object: templateData: templateData === anyName: variableName
    res.render('core-warranty/create-warranty', { displayName: displayName, isAdmin: isAdmin, gotPeople: templateData, navCW: navCW } );
  };
});

/*******************************************************************************
 * Core: Create Record Page
 ******************************************************************************/
router.get('/create-core', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  /*****************************************************************************
   * Build Employees <options> for <select> drop-down with Employee ID + Name
  *****************************************************************************/
  // Sort people/PersonName using Firebase
  dbRef.child('/people/').orderByChild('PersonName').once('value', gotData);

  function gotData(data) {
    var templateData = [];

    data.forEach(function(data) {
      templateData.push(data.val());
    });
    // Question) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // Answer) because the page render will happen faster than the data collection, so need to render to template after data collected
    // handlebars object: templateData: templateData === anyName: variableName
    res.render('core-warranty/create-core', { displayName: displayName, isAdmin: isAdmin, gotPeople: templateData, navCW: navCW } );
  };
});

/*******************************************************************************
 * Warranty Record: Submit Form
 ******************************************************************************/
// Restrict post capability by applying the middlware from app.js
router.post('/insert-warranty', function(req, res, next) {

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
    VIN: req.body.vin,
    Vendor: req.body.vendor,
    TurnedInBy: req.body.turnedInBy,
    ReceivedBy: req.body.receivedBy
  };
  // Get a key for a new core Record
  var newKey = firebase.database().ref().child('warranty').push().key;

  // write the new core data to the core list
  var updates = {};
  updates['/warranty/' + newKey] = item;

  // update the new-key-record with the data
  var dbUpdate = req.app.locals.dbRef.update(updates);

  dbUpdate.then(function(data) {
    // url redirect after post, include query parameter
    res.redirect('/core-warranty/print-warranty/?KEY=' + newKey);
  })
  .catch(function(error) {
    console.log("error", error);
  });
});


/*******************************************************************************
 * Core Record: Submit Form
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
  var newKey = firebase.database().ref().child('core').push().key;

  // write the new core data to the core list
  var updates = {};
  updates['/core/' + newKey] = item;

  // update the new-key-record with the data
  var dbUpdate = req.app.locals.dbRef.update(updates);

  dbUpdate.then(function(data) {
    // url redirect after post, include query parameter
    res.redirect('/core-warranty/print-core/?KEY=' + newKey);
  })
  .catch(function(error) {
    console.log("error", error);
  });
});

/*******************************************************************************
 * List Warranty Page
 ******************************************************************************/
router.get('/list-warranty', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  /*****************************************************************************
   * Data for Handlebars
  *****************************************************************************/
  dbRef.child('warranty').once('value', gotData);
  // global variable so warranty data can be accessed after the function
  var templateData;

  function gotData(data) {
    // access data values
    templateData = data.val();
    // Question) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // Answer) because the page render will happen faster than the data collection, so need to render to template after data collected
    // handlebars object: templateData: templateData === anyName: variableName
    res.render('core-warranty/list-warranty', { displayName: displayName, isAdmin: isAdmin, warrantyData: templateData, navCW: navCW } );
  };
});

/*******************************************************************************
 * List Core Page
 ******************************************************************************/
router.get('/list-core', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
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
    // Question) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // Answer) because the page render will happen faster than the data collection, so need to render to template after data collected
    // handlebars object: templateData: templateData === anyName: variableName
    res.render('core-warranty/list-core', { displayName: displayName, isAdmin: isAdmin, isAdmin: isAdmin, coreData: templateData, navCW: navCW } );
  };
});

/*******************************************************************************
 * Print Core Page
 ******************************************************************************/
router.get('/print-core', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

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

    res.render('core-warranty/print-core', { displayName: displayName, isAdmin: isAdmin, templateData: templateData, navCW: navCW } );
  };
});

/*******************************************************************************
 * Print Warranty Page
 ******************************************************************************/
router.get('/print-warranty', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  /*****************************************************************************
   * Data for Handlebars
  *****************************************************************************/
  // get key from url query parameter '?KEY='
  var key = req.query.KEY;

  // get 'core' data record associated with 'key' value
  dbRef.child('warranty/' + key).once('value', gotData);

  function gotData(data) {
    // access data values
    templateData = data.val();

    res.render('core-warranty/print-warranty', { displayName: displayName, isAdmin: isAdmin, templateData: templateData, navCW: navCW } );
  };
});

/*******************************************************************************
 * Core Record Page
 ******************************************************************************/
router.get('/record-core', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

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
    // Question) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // Answer) because the page render will happen faster than the data collection, so need to render to template after data collected
    // handlebars object: templateData: templateData === anyName: variableName
    res.render('core-warranty/record-core', { displayName: displayName, isAdmin: isAdmin, templateData: templateData, key: key, navCW: navCW });
  };
});

/*******************************************************************************
 * Warranty Record Page
 ******************************************************************************/
router.get('/record-warranty', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  /*****************************************************************************
   * Data for Handlebars
  *****************************************************************************/
  // get key from url query parameter '?KEY='
  var key = req.query.KEY;
  // get 'core' data record associated with 'key' value
  dbRef.child('warranty/' + key).once('value', gotData);

  function gotData(data) {
    // access data values
    templateData = data.val();
    // Question) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // Answer) because the page render will happen faster than the data collection, so need to render to template after data collected
    // handlebars object: templateData: templateData === anyName: variableName
    res.render('core-warranty/record-warranty', { displayName: displayName, isAdmin: isAdmin, templateData: templateData, key: key, navCW: navCW });
  };
});


/*******************************************************************************
 * People: List Page
 ******************************************************************************/
router.get('/people-list', mw.userRole, function(req, res, next) {
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  /*****************************************************************************
   * Data for Handlebars
  *****************************************************************************/
  dbRef.child('people').once('value', gotData);
  // global variable so warranty data can be accessed after the function
  var templateData;

  function gotData(data) {
    // access data values
    templateData = data.val();
    // Question) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // Answer) because the page render will happen faster than the data collection, so need to render to template after data collected
    // handlebars object: templateData: templateData === anyName: variableName
    res.render('core-warranty/people-list', { displayName: displayName, isAdmin: isAdmin, peopleData: templateData, navCW: navCW } );
  };
});

/*******************************************************************************
 * People: Create Person Page
 ******************************************************************************/
router.get('/people-add', mw.userRole, function(req, res, next) {
  var user = req.app.locals.user;
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  res.render('core-warranty/people-add', { displayName: displayName, isAdmin: isAdmin, navCW: navCW });
});

/*******************************************************************************
 * People: Create Person Form
 ******************************************************************************/
router.post('/insert-person', function(req, res, next) {
  // get the form fields data
  var item = {
    PersonName: req.body.PersonName
  };

  // Get a key for a new record
  var newKey = req.app.locals.dbRef.child('people').push().key;

  // write the new core data to the core list
  var updates = {};
  updates['/people/' + newKey] = item;
  // update the new-key-record with the data
  var dbUpdate = req.app.locals.dbRef.update(updates);

  dbUpdate.then(function() {
    // url redirect after post, include query parameter
    res.redirect('/core-warranty/people-list');
  })
  .catch(function(error) {
    console.log("error", error);
  });
});

/*******************************************************************************
 * People: Delete Person Page
 ******************************************************************************/
router.get('/people-delete', mw.userRole, function(req, res, next) {
  var user = req.app.locals.user;
  var displayName = req.user.displayName;
  // works as boolean, if conditional is true, then true, conditional is false, then false
  var isAdmin = req.app.locals.userRole === 'admin';

  /*****************************************************************************
   * Data for Handlebars
  *****************************************************************************/
  // key is needed in template for the <form> that handle Delete Person (below)
  // get key from url query parameter '?KEY='
  var key = req.query.KEY;
  // get 'core' data record associated with 'key' value
  dbRef.child('people/' + key).once('value', gotData);
  function gotData(data) {
    // access data values
    templateData = data.val();
    // Question) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // Answer) because the page render will happen faster than the data collection, so need to render to template after data collected
    // handlebars object: templateData: templateData === anyName: variableName
    res.render('core-warranty/people-delete', { displayName: displayName, isAdmin: isAdmin, templateData: templateData, key: key, navCW: navCW });
  };
});


/*******************************************************************************
 * People: Delete Person Form
 ******************************************************************************/
router.post('/delete-person', function(req, res, next) {

  console.log("got delete person ");
  var user = req.app.locals.user;
  /*****************************************************************************
   * Delete Employee
  *****************************************************************************/
  // Key: needed in order to remove correct PersonName from database
  // Could not figure a different way to get the key from the form post...
  // get entire body from form submission, which is only the name={{ key}}
  var body = req.body;
  // Get the KEY value by accessing the Object.keys() which returns the KEY of the
  // object: this works because the Object only has 1 item, and key is the
  // property name, and, not that it matters, but the property value does not exist
  // https://stackoverflow.com/a/6765917
  var key = Object.keys(body);

  // select the database collection and key/record you want to remove from db
  var personRef = req.app.locals.dbRef.child('people/' + key);
  // remove record from database by adding 'remove()' to the dbRef
  var dbUpdate = personRef.remove();

  dbUpdate.then(function() {
    // url redirect after post, include query parameter
    res.redirect('/core-warranty/people-list');
  })
  .catch(function(error) {
    console.log("error", error);
  });
});

module.exports = router;

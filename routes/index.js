var express = require('express');
var router = express.Router();
/*******************************************************************************
 * Firebase Initialize
 ******************************************************************************/
 var firebase = require("../firebase");

 var dbRef = firebase.database().ref('node');

 var warrantyRef = dbRef.child('warranty');
/** Firebase End **************************************************************/


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  req.session.errors = null;
});

// Insert Data
router.post('/insert', function(req, res, next) {
  // get the form fields data
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  // insert
  // i could bind the database query to variable which is then promise...
//  userData.insert(item);
  warrantyRef.push(item);
  // url redirect after post
  res.redirect('/');
});

// Get Data
router.get('/get-data', function(req, res, next) {
  // pass empty object { } to get all data in the collection
  userData.find({}).then((docs)=>{
    // pass the results to our 'index' view ...render
    // i could bind the database query to variable which is then promise...
    res.render('index', {items: docs});
  });
});
// Update Data
router.post('/update', function(req, res, next) {
  // get the form fields data
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  // identify id of item to update
  var id = req.body.id;
  // update
  // method #1: userData.update({"_id", db.id(id)}, item);
  // i could bind the database query to variable which is then promise...
  userData.update({"_id": id}, item);
});
// Delete Data
router.post('/delete', function(req, res, next) {
  // identify id of item to delete
  var id = req.body.id;
  // delete
  // method #1 userData.delete({"_id": db.id(id)});
  // i could bind the database query to variable which is then promise...
  userData.remove(id);
});

module.exports = router;

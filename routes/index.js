var express = require('express');
var router = express.Router();
// get database connection
var db = require('monk')('localhost:27017/test');
// get the collection 'user-data'... setup data object
var userData = db.get('user-data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  req.session.errors = null;
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
  userData.insert(item);
  // url redirect after post
  res.redirect('/');
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
//  var id = req.body.id;
var title = req.body.id;
  // update
  // method #1: userData.update({"_id", db.id(id)}, item);
  // i could bind the database query to variable which is then promise...
  userData.update({title: 'new'}, {title: 'bar'});
});
// Delete Data
router.post('/delete', function(req, res, next) {
  // identify id of item to delete
  var id = req.body.id;
  // delete
  // method #1 userData.delete({"_id": db.id(id)});
  // i could bind the database query to variable which is then promise...
  userData.removeById(id);
});

module.exports = router;

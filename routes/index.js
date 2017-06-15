var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
// mongo support module
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  req.session.errors = null;
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    // entries stored in the cursor variable
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      // render items on the index page
      res.render('index', {items: resultArray});
    });
  });
});

router.post('/insert', function(req, res, next) {
  // get the form fields data
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  // insert
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    // access the db collection into which you want to insert data
    // 'insertOne' used to insert one entry
    db.collection('user-data').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log("Item inserted");
      db.close();
    });
  });

  // url redirect after post
  res.redirect('/');
});

router.post('/update', function(req, res, next) {

});

router.post('/delete', function(req, res, next) {

});


module.exports = router;

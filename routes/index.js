var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cool, huh', condition: true, anyArray: [1,2,3] });
});

// Get route /test/ + parameter "id"
router.get('/test/:id', function(req, res, next){
  // response: render 'test' route (test.hbs)
  // "output" is the variable to be called in "test" template
  res.render('test', {output: req.params.id})
});

// Post for when form submitted, plus redirect after form submitted
router.post('/test/submit', function(req, res, next) {
  var id = req.body.id;
  res.redirect('/test/' + id);
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
// this router is for /core-warranty dir, see app.js for initializer
router.get('/', function(req, res, next) {
  res.send('core warranty main');
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

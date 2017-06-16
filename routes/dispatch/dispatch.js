var express = require('express');
var router = express.Router();

/* GET users listing. */
// this router is for /dispatch dir, see app.js for initializer
router.get('/', function(req, res, next) {
  res.send('dispatch dashboard');
});
// this is a subroute of the above / .../users
router.get('/dispatch-requests', function(req, res, next) {
  res.send('dispatch requests');
});
// this is a subroute of the above / .../users
router.get('/dispatching', function(req, res, next) {
  res.send('dispatching');
});

module.exports = router;

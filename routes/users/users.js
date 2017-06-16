var express = require('express');
var router = express.Router();

/* GET users listing. */
// this router is for /users dir, see app.js for initializer
router.get('/', function(req, res, next) {
  res.send('user list');
});
// this is a subroute of the above / .../users
router.get('/usercreate', function(req, res, next) {
  res.send('create user');
});

module.exports = router;

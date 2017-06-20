var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var app = express();

// Import firebase initializer
app.locals.firebase = require("./firebase");
// Global dbRef ... so firebase connection available everywhere without import
app.locals.dbRef = app.locals.firebase.database().ref('node');

var firebaseUser = require("./firebase-user");

// Middleware
// Set user as property on the app, so it is available everywhere
// https://stackoverflow.com/questions/18739725/how-to-know-if-user-is-logged-in-with-passport-js/18739922#18739922
function loggedIn(req, res, next) {
  // Global use of user: make user available in any route
  app.locals.user = firebaseUser.getUser();
  // If user logged in then continue, otherwise redirect to / root
  if (app.locals.user) {
    next();
  } else {
  res.redirect('/');
  }
}

// import route files
var index = require('./routes/index');
var dispatch = require('./routes/dispatch');
var coreWarranty = require('./routes/core-warranty');
var users = require('./routes/users');

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// validator must be added after the bodyParser, because validator needs access to content of the bodyParser
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// by default express Session uses 'memory storage' which is not good for production, use another module for storage
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));

// define routes and route resource files -see @routes files
app.use('/', index);
app.use('/dispatch', dispatch);
app.use('/dispatch-requests', dispatch);
app.use('/dispatching', dispatch);
app.use('/core-warranty', loggedIn, coreWarranty);
app.use('/create-warranty', coreWarranty);
app.use('/create-core', coreWarranty);
app.use('/users', users);
app.use('/user-create', users);
app.use('/user-create-input', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

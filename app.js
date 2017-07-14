var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var FirebaseStore = require('connect-session-firebase')(expressSession);
var ensureLogin = require('connect-ensure-login');
var flash = require('connect-flash');

var app = express();

app.locals.loggedInUsers = [];

// Import firebase initializer
app.locals.firebase = require("./private/firebase/firebase");
var firebaseAdmin = require('./private/firebase/firebase-admin-init');
// Global dbRef ... so firebase connection available everywhere without import
app.locals.dbRef = app.locals.firebase.database().ref();
var firebaseUser = require("./private/firebase/firebase-user");

// Call Function every Three-million milliseconds = 50 minutes (setInterval = Node timer)
// https://nodejs.org/api/timers.html
setInterval(function() {
  firebaseUser.refreshAuthTokens(app.locals.loggedInUsers);
}, 3000000);

// Middleware must be required after ./firebase because middleware uses it
var mw = require('./middleware');

// Passport
passport.use(new Strategy(
  function(email, password, cb) {
    console.log('authenticating user: ', email);
    app.locals.firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(user) {
        console.log("user:", user.uid);
        // Add user to list of logged-in users (used for refreshing auth tokens).
        app.locals.loggedInUsers.push(user.uid);
        cb(null, user);
      })
      .catch(function(error) {
        console.log("error: ", error);
        return cb(null, false, {message: error.message});
      });

  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.uid);
});

passport.deserializeUser(function(uid, cb) {
  firebaseAdmin.auth().getUser(uid)
    .then(function(user) {
      cb(null, user);
    })
    .catch(function(error) {
      console.log("Error fetching user data:", error);
      return cb(error);
    });
});

// import route files
var index = require('./routes/index');
var main = require('./routes/main');
var dispatch = require('./routes/dispatch');
var coreWarranty = require('./routes/core-warranty');
var users = require('./routes/users');

// view engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/',
  partialsDir: __dirname + '/views/partials/'
}));
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
app.use(expressSession({
    store: new FirebaseStore({
      database: firebaseAdmin.database()
    }),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//app.use(middlewareName);  // Where middlewareName is the name of a middleware you want on all routes

// define routes and route resource files -see @routes files
var ensureLoggedIn = ensureLogin.ensureLoggedIn('/');
app.use('/', index);
app.use('/main', ensureLoggedIn, main);
app.use('/dispatch', ensureLoggedIn, mw.authToken, mw.userRole, dispatch);
app.use('/core-warranty', ensureLoggedIn, coreWarranty);
app.use('/users', ensureLoggedIn, mw.userRoleAndAdmin, users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
//  console.log("app error 1");
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

//  console.log("app error 2");
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
//  res.render('error');
});

module.exports = app;

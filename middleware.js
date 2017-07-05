
// Middleware
// https://stackoverflow.com/questions/11691376/expressjs-how-to-share-route-middleware-accross-routes

var firebaseUser = require("./private/firebase/firebase-user");

/*******************************************************************************
 * Redirect to homepage if visitor not logged in (Middleware)
 ******************************************************************************/
// https://stackoverflow.com/questions/18739725/how-to-know-if-user-is-logged-in-with-passport-js/18739922#18739922
module.exports.loggedIn = function(req, res, next) {
  // Global use of user: make user available in any route
  req.app.locals.user = firebaseUser.getUser();
  // If user logged in then continue, otherwise redirect to / root
  if (req.app.locals.user.uid) {
    req.app.locals.uid = req.app.locals.user.uid;
    next();
  } else {
    res.redirect('/');
  }
}
/** End Redirect to homepage if visitor not logged in *************************/


/*******************************************************************************
 * User Role Get (Middleware)
 ******************************************************************************/
// Example Usage: use in app.js to create functions specifically identifying user type
module.exports.userRole = function(req, res, next) {
  firebaseUser.getRole().then(function(userRole) {
    // Store userRole as Global variable
    req.app.locals.userRole = userRole;
    // if i didn't have next(); then no pages that use the userRole would be executed
    next();
  });
}
/** End User Role Get (Middleware) ********************************************/


/*******************************************************************************
 * User Role Check if Admin (Middleware)
 ******************************************************************************/
// Example Usage: restrict routes to admin by applying to route parameters in app.js
module.exports.roleAdmin = function(req, res, next) {
  // If user is admin then continue, otherwise redirect to / root
  if (req.app.locals.userRole == 'admin') {
    next();
  } else {
    res.redirect('/core-warranty');
  }
}
/** End User Role Check if Admin (Middleware) *********************************/


module.exports.userRoleAndAdmin = [module.exports.userRole, module.exports.roleAdmin];

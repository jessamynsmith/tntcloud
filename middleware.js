
// Middleware
// https://stackoverflow.com/questions/11691376/expressjs-how-to-share-route-middleware-accross-routes

var firebaseUser = require("./private/firebase/firebase-user");


/*******************************************************************************
 * User Role Get (Middleware)
 ******************************************************************************/
// Example Usage: use in app.js to create functions specifically identifying user type
module.exports.userRole = function(req, res, next) {
  firebaseUser.getRole(req.user).then(function(userRole) {
    // Store userRole as Global variable
    req.app.locals.userRole = userRole;
    console.log("Middleware User Role ", req.app.locals.userRole);
    res.cookie('userRole', req.app.locals.userRole, { httpOnly: false });
    // if I didn't have next(); then no pages that use the userRole would be executed
    next();
  });
};
/** End User Role Get (Middleware) ********************************************/


module.exports.authToken = function(req, res, next) {
  firebaseUser.getAuthToken(req.user).then(function(authToken) {
    res.cookie('fb-auth-token', authToken, { httpOnly: false });
    next();
  });
};


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
};
/** End User Role Check if Admin (Middleware) *********************************/


module.exports.userRoleAndAdmin = [module.exports.userRole, module.exports.roleAdmin];

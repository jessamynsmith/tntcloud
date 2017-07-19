
// User Role Cookie + Role
var userRole = Cookies.get('userRole');
var isAdmin = userRole === 'admin';
var isBasic = userRole === 'basic';
var isBasic = userRole === 'basic';
var isBasic = userRole === 'basic';
var isBasic = userRole === 'basic';

/*******************************************************************************
 * Post form Data to Database
*******************************************************************************/

function dispatchCreateFormDataRecord(){
  event.preventDefault();

  // Cookie/Token Authentication: Sign In with Auth Token so can pull Firebase Data from Front-end
  var authToken = Cookies.get('fb-auth-token');
  firebase.auth().signInWithCustomToken(authToken)
  .then(function() {

    // Current User Info
    var CreatedByUID = firebase.auth().currentUser.uid;
    var CreatedByDisplayName = firebase.auth().currentUser.displayName;
    // Server Date/Time https://firebase.google.com/docs/reference/js/firebase.database.ServerValue
    const DateTimeStampServer = firebase.database.ServerValue.TIMESTAMP;
    let Date = DateTimeStampServer;
    Date = moment().format('L'); // Format date with moment.js
    let DateTime = moment().format('h:mm:ss A');

    // Create Object 'submitData' for data to submit to Firebase
    // for this to work correctly, all template form field names must match the field
    // names in firebase.
    let submitData = $("#requestCreateForm").serializeJSON();

    // Add to object 'submitData' to send to Firebase
    // status of Dispatch Request
    submitData.Driver = "";
    submitData.Status = "requested";

    // current user
    submitData.CreatedByUID = CreatedByUID;
    submitData.CreatedByDisplayName = CreatedByDisplayName;
    // date created
    submitData.Date = Date;
    submitData.DateTime = DateTime;
    submitData.DateTimeStampServer = DateTimeStampServer;
    // date received -- add empty values so 'dispatch-request-received.js' has fields to 'update'
    submitData.ReceivedDate = "";
    submitData.ReceivedDateTime = "";
    submitData.ReceivedDateTimeStampServer = "";

    // Get a key for a new core Record
    var newKey = firebase.database().ref().child('dispatch').push().key;

    // write the new core data to the core list
    var updates = {};
    updates['/dispatch/' + newKey] = submitData;

    // update the new-key-record with the data
    var dbUpdate = firebase.database().ref().update(updates);

    // Close Reveal Modal (Foundation)
    // http://foundation.zurb.com/sites/docs/reveal.html
    $('#requestCreate').foundation('close');

  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    console.log(errorCode);
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}; // End submitCoreForm Function

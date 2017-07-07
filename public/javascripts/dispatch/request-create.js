
/*******************************************************************************
 * Post form Data to Database
*******************************************************************************/

function dispatchCreateFormDataRecord(){
  event.preventDefault();

  // Cookie/Token authentication
  var authToken = Cookies.get('fb-auth-token');
//  console.log("create-request.hbs auth token ", authToken);
  firebase.auth().signInWithCustomToken(authToken)
  .then(function() {

    // Server Date/Time https://firebase.google.com/docs/reference/js/firebase.database.ServerValue
    const DateTimeStampServer = firebase.database.ServerValue.TIMESTAMP;
    let Date = DateTimeStampServer;
    Date = moment().format('L'); // Format date with moment.js
    let DateTime = moment().format('h:mm:ss A');
    /***************************************************************************
     * Form Element Options and Values
    ***************************************************************************/
    let Vendor = document.getElementById('createVendor').value;
    let BranchFrom = document.getElementById('createBranchFrom').value;
    let BranchTo = document.getElementById('createBranchTo').value;
    let Urgency = document.getElementById('createUrgency').value;
    let Reference = document.getElementById('createReference').value;
    let Instructions = document.getElementById('createInstructions').value;
    let Driver = document.getElementById('createDriver').value;
    // Status of Dispatch Request
      if (Driver === "") {
        var Status = "requested";
      } else {
        Status = "dispatched";
      }

    // Data to submit to database
    var submitData = {
      DateTimeStampServer,
      Date,
      DateTime,
      Vendor,
      BranchFrom,
      BranchTo,
      Urgency,
      Reference,
      Instructions,
      Driver,
      Status
    }

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

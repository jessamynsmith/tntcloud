
/*******************************************************************************
 * Post form Data to Database
*******************************************************************************/

function submitForm(){
  event.preventDefault();

  var authToken = Cookies.get('fb-auth-token');
  console.log("create-request.hbs auth token ", authToken);
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
    let RO = document.getElementById('core-ro').value;
    let Customer = document.getElementById('core-customer').value;
    let FailedPartNumber = document.getElementById('core-failed-part-number').value;

    // Data to submit to database
    var submitData = {
      DateTimeStampServer,
      Date,
      DateTime,
      RO,
      Customer,
      FailedPartNumber
    }

    // Get a key for a new core Record
    var newKey = firebase.database().ref().child('dispatch').push().key;

    // write the new core data to the core list
    var updates = {};
    updates['/dispatch/' + newKey] = submitData;

    // update the new-key-record with the data
    var dbUpdate = firebase.database().ref().update(updates);

    // redirect page with url parameter containing core key
    window.location.href = `/dispatch`;

  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    console.log(errorCode);
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}; // End submitCoreForm Function
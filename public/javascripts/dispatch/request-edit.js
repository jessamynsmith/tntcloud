
//////////////////////////////////////////////////////////////////////////////
// Retrieve Dispatch Request Record
//////////////////////////////////////////////////////////////////////////////
function requestEditFormDataLoad(clicked_id) {
  var key = clicked_id; // Get key passed to URL from 'view' link
  // Use "KEY" url parameter to target the core/ record
  var dbRefEdit = firebase.database().ref().child('dispatch/' + key);
  // Re: "once" https://firebase.google.com/docs/reference/js/firebase.database.Query#once
  dbRefEdit.once('value', gotData);

  ////////////////////////////////////////////////////////////////////////////////
  // Request Record Data to Edit Form
  ////////////////////////////////////////////////////////////////////////////////
  function gotData(data) {
    // assign above core data to 'coreRecord'
    // data.val() returns Object; destructure to pull out individual property values
    var dispatchRecord = data.val();

    // Destructure Object to individual property values
    var { BranchFrom, BranchTo, Driver, Instructions, Reference, Urgency, Vendor } = dispatchRecord;
    if (Driver !== "") {
      document.getElementById("Driver").value = Driver;
    }
    document.getElementById("BranchFrom").value = BranchFrom;
    document.getElementById("BranchTo").value = BranchTo;
    document.getElementById("Instructions").value = Instructions;
    document.getElementById("Reference").value = Reference;
    document.getElementById("Urgency").value = Urgency;
    document.getElementById("Vendor").value = Vendor;
  } // End function gotData
}

/*******************************************************************************
 * Post form Data to Database
*******************************************************************************/
/*
function submitRequestEditForm(){
  event.preventDefault();

  // Cookie/Token authentication
  var authToken = Cookies.get('fb-auth-token');
  console.log("create-request.hbs auth token ", authToken);
  firebase.auth().signInWithCustomToken(authToken)
  .then(function() {

    // Server Date/Time https://firebase.google.com/docs/reference/js/firebase.database.ServerValue
    const DateTimeStampServer = firebase.database.ServerValue.TIMESTAMP;
    let Date = DateTimeStampServer;
    Date = moment().format('L'); // Format date with moment.js
    let DateTime = moment().format('h:mm:ss A');
    ////////////////////////////////////////////////////////////////////////////
    // Form Element Options and Values
    ////////////////////////////////////////////////////////////////////////////
    let Vendor = document.getElementById('vendor').value;
    let BranchFrom = document.getElementById('branch-from').value;
    let BranchTo = document.getElementById('branch-to').value;
    let Urgency = document.getElementById('urgency').value;
    let Reference = document.getElementById('reference').value;
    let Instructions = document.getElementById('instructions').value;
    let Driver = document.getElementById('driver').value;
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
*/

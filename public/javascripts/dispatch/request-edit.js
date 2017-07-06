var editKey;

function getIdKey(clicked_id) {
  editKey = clicked_id;
}

//////////////////////////////////////////////////////////////////////////////
// Retrieve Dispatch Request Record
//////////////////////////////////////////////////////////////////////////////

function requestEditFormDataLoad(clicked_id) {
  var key = clicked_id;
  // var key = clicked_id; // Get key passed to URL from 'view' link
  console.log("Got Key? 111 ", key);
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
      document.getElementById("editDriver").value = Driver;
    }
    document.getElementById("editBranchFrom").value = BranchFrom;
    document.getElementById("editBranchTo").value = BranchTo;
    document.getElementById("editInstructions").value = Instructions;
    document.getElementById("editReference").value = Reference;
    document.getElementById("editUrgency").value = Urgency;
    document.getElementById("editVendor").value = Vendor;
  } // End function gotData
}
//console.log("Got Key? 222 ", key);

/*******************************************************************************
 * Update form Data to Database
*******************************************************************************/

function submitRequestEditForm(){
  event.preventDefault();
  var key = editKey;
  // Cookie/Token authentication
  var authToken = Cookies.get('fb-auth-token');
//  console.log("edit-request.hbs auth token ", authToken);
  firebase.auth().signInWithCustomToken(authToken)
  .then(function() {

    ////////////////////////////////////////////////////////////////////////////
    // Form Element Options and Values
    ////////////////////////////////////////////////////////////////////////////
    let Vendor = document.getElementById('editVendor').value;
    let BranchFrom = document.getElementById('editBranchFrom').value;
    let BranchTo = document.getElementById('editBranchTo').value;
    let Urgency = document.getElementById('editUrgency').value;
    let Reference = document.getElementById('editReference').value;
    let Instructions = document.getElementById('editInstructions').value;
    let Driver = document.getElementById('editDriver').value;
    // Status of Dispatch Request
      if (Driver === "") {
        var Status = "requested";
      } else {
        Status = "dispatched";
      }

    // Data to submit to database
    var submitData = {
      Vendor,
      BranchFrom,
      BranchTo,
      Urgency,
      Reference,
      Instructions,
      Driver,
      Status
    }

    // write the new core data to the core list
    var updates = {};
    updates['/dispatch/' + key] = submitData;

    // update the new-key-record with the data
    var dbUpdate = firebase.database().ref().update(updates);

    // Close Reveal Modal (Foundation)
    // http://foundation.zurb.com/sites/docs/reveal.html
    $('#requestEdit').foundation('close');

  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    console.log(errorCode);
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}; // End submitCoreForm Function

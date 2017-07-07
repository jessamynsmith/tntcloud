
////////////////////////////////////////////////////////////////////////////////
// Add Edit Record ID(Key) to Global Variable for Use in dispatchEditFormDataUpdate
////////////////////////////////////////////////////////////////////////////////
var editKey;
function getIdKey(clicked_id) {
  editKey = clicked_id;
}

////////////////////////////////////////////////////////////////////////////////
// Retrieve Dispatch Request Record
////////////////////////////////////////////////////////////////////////////////

function dispatchEditFormDataLoad(clicked_id) {
  // fyi - for some reason, above global variable 'editKey' is not available in this function
  var key = clicked_id;
  // Use "key" value to target the dispatch record
  var dbRefEdit = firebase.database().ref().child('dispatch/' + key);
  // Re: "once" https://firebase.google.com/docs/reference/js/firebase.database.Query#once
  dbRefEdit.once('value', gotData);

  //////////////////////////////////////////////////////////////////////////////
  // Dispay Data on Edit Form
  //////////////////////////////////////////////////////////////////////////////
  function gotData(data) {
    // assign above core data to 'coreRecord'
    // data.val() returns Object; destructure to pull out individual property values
    var dispatchRecord = data.val();
    // Destructure Object to individual property values
    var { BranchFrom, BranchTo, Driver, Instructions, Reference, Urgency, Vendor } = dispatchRecord;

    document.getElementById("editVendor").value = Vendor;
    document.getElementById("editBranchFrom").value = BranchFrom;
    document.getElementById("editBranchTo").value = BranchTo;
    document.getElementById("editUrgency").value = Urgency;
    document.getElementById("editReference").value = Reference;
    document.getElementById("editInstructions").value = Instructions;
    document.getElementById("editDriver").value = Driver;
  } // End function dispatchEditFormDataLoad
}

/*******************************************************************************
 * Update Data for Dispatch Record
*******************************************************************************/

function dispatchEditFormDataUpdate(){
  event.preventDefault();

  var key = editKey;

  // Cookie/Token authentication
  var authToken = Cookies.get('fb-auth-token');
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

    ////////////////////////////////////////////////////////////////////////////
    // Update existing-record without overwriting or altering date values
    ////////////////////////////////////////////////////////////////////////////
    // locate the record to update
    var dbRefUpdate = firebase.database().ref().child('dispatch/' + key);
    // update data
    dbRefUpdate.update(submitData);

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
}; // End dispatchEditFormDataUpdate Function


////////////////////////////////////////////////////////////////////////////////
// Add Edit Record ID(Key) to Global Variable for Use in dispatchEditFormDataUpdate
////////////////////////////////////////////////////////////////////////////////
var editKey;
// function called onclick in dispatching.js
function getIdKey(clicked_id) {
  editKey = clicked_id;
}

////////////////////////////////////////////////////////////////////////////////
// Retrieve Dispatch Request Record
////////////////////////////////////////////////////////////////////////////////
// function called onclick in dispatching.js
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
// function called in dispatching.hbs onSubmit 'Request Edit Form'
function dispatchEditFormDataUpdate(){
  event.preventDefault();
  // get Key value from this file's global variable 'editKey'
  var key = editKey;

  // Cookie/Token Authentication: Sign In with Auth Token so can pull Firebase Data from Front-end
  var authToken = Cookies.get('fb-auth-token');
  firebase.auth().signInWithCustomToken(authToken)
  .then(function() {

    // For this to work correctly, all template form field names must match the field
    // names in firebase.
    let submitData = $("#requestCreateForm").serializeJSON();

    // Status of Dispatch Request
    if (submitData.driver === "") {
      submitData.Status = "requested";
    } else {
      submitData.Status = "dispatched";
    }

    console.log(submitData);

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

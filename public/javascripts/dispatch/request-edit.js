
//////////////////////////////////////////////////////////////////////////////
// Retrieve Dispatch Request Record
//////////////////////////////////////////////////////////////////////////////
function requestEditFormDataLoad(clicked_id) {
  var key = clicked_id; // Get key passed to URL from 'view' link
  console.log("Got Key? ", key);
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


///////////////////////////////////////////////////////////////////////////////
// Request Form Load includes Dynamic Title
///////////////////////////////////////////////////////////////////////////////

// Function triggered by 'Create Request' button and 'Edit' link of any active request
// https://stackoverflow.com/a/4825325 (get ID value of clicked element)
function requestFormLoad(clicked_title, clicked_id) {
  if (clicked_title === "actionRequestCreate") {
    requestCardTitle = `<h4>Create Pickup Request</h4>`;
  } else if (clicked_title === "actionRequestEdit") {
    requestCardTitle = `<h4>Edit Pickup Request</h4>`;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Retrieve Dispatch Request Record
  //////////////////////////////////////////////////////////////////////////////

  var key = clicked_id; // Get key passed to URL from 'view' link
  // Use "KEY" url parameter to target the core/ record
  var dbRefEdit = firebase.database().ref().child('dispatch/' + key);
  // Re: "once" https://firebase.google.com/docs/reference/js/firebase.database.Query#once
  dbRefEdit.once('value', gotData);

  //////////////////////////////////////////////////////////////////////////////
  // Request Data
  //////////////////////////////////////////////////////////////////////////////
  function gotData(data) {
    // assign above core data to 'coreRecord'
    // data.val() returns Object; destructure to pull out individual property values
    var editRecord = data.val();
    // Destructure Object to individual property values
    var { BranchFrom, BranchTo, Driver, Instructions, Reference, Status, Urgency, Vendor } = "";
    if (key) {
      var keyTitle = `<h6>${clicked_id}</h6>`;
      var { BranchFrom, BranchTo, Driver, Instructions, Reference, Status, Urgency, Vendor } = editRecord;
      console.log("Edit Record ", editRecord);
    } else {
      keyTitle = ""; BranchFrom = ""; BranchTo = ""; Driver = ""; Instructions = ""; Reference = "", Status = "", Urgency = "", Vendor = "";
    }

    console.log("Vendor? ", Vendor);
    // Assign core Data to Table <div>'s

    /***************************************
    * Request Input Form
    ***************************************/
    var requestInputForm =
    `<div class="hover-form">
      <div class="card">
        <div class="card-divider">
          ${requestCardTitle}
          ${keyTitle}
          <button class="close-button" data-close aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <!-- Vendor ------------------------------------------------------------->
      <div class="input-group">
        <span class="input-group-label">Vendor</span>
        <input type="text" id="vendor" placeholder="Vendor" class="input-group-field" name="vendor" value="${Vendor}">
      </div>
      <!-- Branch From -------------------------------------------------------->
      <div class="input-group">
        <span class="input-group-label">From</span>
        <select id="branch-from"  class="input-group-field" name="branch-from" value="${BranchFrom}">
          <!-- <option value="">Select Branch</option> -->
          <option value="JAX">JAX</option>
          <option value="NFWS">NFWS</option>
          <option value="LC">LC</option>
          <option value="WC">WC</option>
          <option value="440">440</option>
        </select>
      </div>
      <!-- Branch To ---------------------------------------------------------->
      <div class="input-group">
        <span class="input-group-label">To</span>
        <select id="branch-to"  class="input-group-field" name="branch-to" value="${BranchTo}">
          <!-- <option value="">Select Branch</option> -->
          <option value="JAX">JAX</option>
          <option value="NFWS">NFWS</option>
          <option value="LC">LC</option>
          <option value="WC">WC</option>
          <option value="440">440</option>
        </select>
      </div>
      <!-- Priority ---------------------------------------------------------->
      <div class="input-group">
        <span class="input-group-label">Urgency</span>
        <select id="urgency"  class="input-group-field" name="urgency" value="${Urgency}">
          <option value="normal">Normal</option>
          <option value="low">Low</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>
      <!-- Reference ---------------------------------------------------------->
      <div class="input-group">
        <span class="input-group-label">Reference</span>
        <input type="text" id="reference" placeholder="Reference"  class="input-group-field" name="reference" value="${Reference}"/>
      </div>
      <!-- Instructions ------------------------------------------------------->
      <div class="input-group">
        <span class="input-group-label">Instructions</span>
        <input type="text" id="instructions" placeholder="Instructions"  class="input-group-field" name="instructions" value="${Instructions}"/>
      </div>
      <!-- Driver ------------------------------------------------------->
      <div class="input-group">
        <span class="input-group-label">Driver</span>
        <input type="text" id="driver" placeholder="Driver"  class="input-group-field" name="driver" value="${Driver}"/>
      </div>
      <!-- Submit Button ------------------------------------------------------>
      <div>
        <input id="submit-dispatch-request" type="submit" class="button primary">
      </div>
    </div>
    `
    /*******************************************************************************
     * Request Form Add to DOM
    *******************************************************************************/
    // Request Create
    var parentDivRequestCreate = document.getElementById("requestCreateForm");
    parentDivRequestCreate.innerHTML = requestInputForm;

    // Request Edit
    var parentDivRequestEdit = document.getElementById("requestEditForm");
    parentDivRequestEdit.innerHTML = requestInputForm;

  } // End function gotData
}

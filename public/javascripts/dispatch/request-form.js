
///////////////////////////////////////////////////////////////////////////////
// Request Form Load includes Dynamic Title
///////////////////////////////////////////////////////////////////////////////

// Function triggered by 'Create Request' button and 'Edit' link of any active request
// https://stackoverflow.com/a/4825325 (get ID value of clicked element)
function requestFormLoad(clicked_title) {
  if (clicked_title === "actionRequestCreate") {
    requestCardTitle = `<h4>Create Pickup Request</h4>`;
  } else if (clicked_title === "actionRequestEdit") {
    requestCardTitle = `<h4>Edit Pickup Request</h4>`;
  }
  /***************************************
  * Request Input Form
  ***************************************/
  var requestInputForm =
  `<div class="hover-form">
    <div class="card">
      <div class="card-divider">
        ${requestCardTitle}
        <button class="close-button" data-close aria-label="Close modal" type="button">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <!-- Vendor ------------------------------------------------------------->
    <div class="input-group">
      <span class="input-group-label">Vendor</span>
      <input type="text" id="Vendor" placeholder="Vendor" class="input-group-field" name="vendor">
    </div>
    <!-- Branch From -------------------------------------------------------->
    <div class="input-group">
      <span class="input-group-label">From</span>
      <select id="BranchFrom"  class="input-group-field" name="branch-from">
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
      <select id="BranchTo"  class="input-group-field" name="branch-to">
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
      <select id="Urgency"  class="input-group-field" name="urgency">
        <option value="normal">Normal</option>
        <option value="low">Low</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
    </div>
    <!-- Reference ---------------------------------------------------------->
    <div class="input-group">
      <span class="input-group-label">Reference</span>
      <input type="text" id="Reference" placeholder="Reference"  class="input-group-field" name="reference"/>
    </div>
    <!-- Instructions ------------------------------------------------------->
    <div class="input-group">
      <span class="input-group-label">Instructions</span>
      <input type="text" id="Instructions" placeholder="Instructions"  class="input-group-field" name="instructions"/>
    </div>
    <!-- Driver ------------------------------------------------------->
    <div class="input-group">
      <span class="input-group-label">Driver</span>
      <input type="text" id="Driver" placeholder="Driver"  class="input-group-field" name="driver"/>
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
}

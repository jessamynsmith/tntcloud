var requestCardTitle = "";

function requestCreateFormTitle() {
  requestCardTitle = `<h4>Create Pickup Request</h4>`;
  console.log("Function ", requestCardTitle);
}
/*******************************************************************************
 * Request Form Add to DOM
*******************************************************************************/
// Request Create
var parentDivRequestCreate = document.getElementById("requestCreateForm");

// Request Edit
var parentDivRequestEdit = document.getElementById("requestEditForm");


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
      <input type="text" id="vendor" placeholder="Vendor" class="input-group-field" name="vendor">
    </div>
    <!-- Branch From -------------------------------------------------------->
    <div class="input-group">
      <span class="input-group-label">From</span>
      <select id="branch-from"  class="input-group-field" name="branch-from">
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
      <select id="branch-to"  class="input-group-field" name="branch-to">
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
      <select id="urgency"  class="input-group-field" name="urgency">
        <option value="normal">Normal</option>
        <option value="low">Low</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
    </div>
    <!-- Reference ---------------------------------------------------------->
    <div class="input-group">
      <span class="input-group-label">Reference</span>
      <input type="text" id="reference" placeholder="Reference"  class="input-group-field" name="reference"/>
    </div>
    <!-- Instructions ------------------------------------------------------->
    <div class="input-group">
      <span class="input-group-label">Instructions</span>
      <input type="text" id="instructions" placeholder="Instructions"  class="input-group-field" name="instructions"/>
    </div>
    <!-- Driver ------------------------------------------------------->
    <div class="input-group">
      <span class="input-group-label">Driver</span>
      <input type="text" id="driver" placeholder="Driver"  class="input-group-field" name="driver"/>
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
parentDivRequestCreate.innerHTML += requestInputForm;

// Request Edit
parentDivRequestEdit.innerHTML += requestInputForm;

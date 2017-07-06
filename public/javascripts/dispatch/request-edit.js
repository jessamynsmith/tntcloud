
/***************************************
* Handlebars
***************************************/
// Handlebars #if ../isAdmin :: https://stackoverflow.com/questions/13645084/access-a-variable-outside-the-scope-of-a-handlebars-js-each-loop
var rawTemplateRequestEdit =
`<div class="hover-form">
  <div class="card">
    <div class="card-divider">
      <h4>Create Pickup Request</h4>
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
 * Post form Data to Database
*******************************************************************************/

function submitForm(){
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

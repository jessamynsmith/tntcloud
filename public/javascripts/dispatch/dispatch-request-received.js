
////////////////////////////////////////////////////////////////////////////////
// Received Confirm Form Load
////////////////////////////////////////////////////////////////////////////////
// function called onclick in dispatching.js
// parameter 'clicked_id' comes from onClick function call which includes (this.id)
function dispatchReceivedLoadConfirmForm(clicked_id) {
  // fyi - for some reason, above global variable 'editKey' is not available in this function
  var key = clicked_id;

  var buttonHTML =
  `<button
      onClick="dispatchReceived(this.id);" id="${key}" class="button alert" type="button">Confirm Received
  </button>`;
  // get div id receivedButtonParent and add buttonHTML as innerHTML
  var parentDiv = document.getElementById("receivedButtonParent");
  parentDiv.innerHTML = buttonHTML;
}


////////////////////////////////////////////////////////////////////////////////
// Update record Status to 'received'
////////////////////////////////////////////////////////////////////////////////
// function called onclick in dispatching.hbs via -> buttonHTML in above function dispatchReceivedLoadConfirmForm
function dispatchReceived(clicked_id) {
  // fyi - for some reason, above global variable 'editKey' is not available in this function
  var key = clicked_id;

  // Cookie/Token Authentication: Sign In with Auth Token so can pull Firebase Data from Front-end
  var authToken = Cookies.get('fb-auth-token');
  firebase.auth().signInWithCustomToken(authToken)
  .then(function() {

    var submitData = {
      Status: "received"
    }
    ////////////////////////////////////////////////////////////////////////////
    // Update record Status to 'received'
    ////////////////////////////////////////////////////////////////////////////
    // locate the record to update
    var dbRefUpdate = firebase.database().ref().child('dispatch/' + key);
    // update data
    dbRefUpdate.update(submitData);

    // Close Reveal Modal (Foundation)
    // http://foundation.zurb.com/sites/docs/reveal.html
    $('#requestReceived').foundation('close');

  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    console.log(errorCode);
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}; // End dispatchEditFormDataUpdate Function

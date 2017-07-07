
////////////////////////////////////////////////////////////////////////////////
// Delete Confirm Form Load
////////////////////////////////////////////////////////////////////////////////
// function called onclick in dispatching.js
function dispatchDeleteLoadConfirmForm(clicked_id) {
  // fyi - for some reason, above global variable 'editKey' is not available in this function
  var key = clicked_id;

  var buttonHTML =
  `<button
      onClick="dispatchDelete(this.id);" id="${key}" class="button alert" type="button">Confirm Delete
  </button>`;
  // get div id deleteButtonParent and add buttonHTML as innerHTML
  var parentDiv = document.getElementById("deleteButtonParent");
  parentDiv.innerHTML = buttonHTML;
}


////////////////////////////////////////////////////////////////////////////////
// Delete Record
////////////////////////////////////////////////////////////////////////////////
// function called onclick in dispatching.hbs via -> buttonHTML in above function dispatchDeleteLoadConfirmForm
function dispatchDelete(clicked_id) {
  // fyi - for some reason, above global variable 'editKey' is not available in this function
  var key = clicked_id;

  // Cookie/Token authentication
  var authToken = Cookies.get('fb-auth-token');
  firebase.auth().signInWithCustomToken(authToken)
  .then(function() {

    ////////////////////////////////////////////////////////////////////////////
    // Delete Record
    ////////////////////////////////////////////////////////////////////////////
    // locate the record to delete
    var dbRefDelete = firebase.database().ref().child('dispatch/' + key);
    // update data
    dbRefDelete.remove();

    // Close Reveal Modal (Foundation)
    // http://foundation.zurb.com/sites/docs/reveal.html
    $('#requestDelete').foundation('close');

  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    console.log(errorCode);
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}; // End dispatchEditFormDataUpdate Function

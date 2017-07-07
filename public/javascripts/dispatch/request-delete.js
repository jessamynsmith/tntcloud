
////////////////////////////////////////////////////////////////////////////////
// Retrieve Dispatch Request Record
////////////////////////////////////////////////////////////////////////////////
// function called onclick in dispatching.js
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

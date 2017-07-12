
// User Role Cookie + Role
var userRole = Cookies.get('userRole');
console.log("User Role Cookie ", userRole);
var isAdmin = userRole === 'admin';
console.log("User Role ", isAdmin);
var isBasic = userRole === 'basic';
console.log("User Role ", isBasic);

var showDelete = false;
var showEdit = false;
if (isAdmin) {
  showDelete = true;
}

/*******************************************************************************
* Handlebars
*******************************************************************************/
// #if ../isAdmin === https://stackoverflow.com/questions/13645084/access-a-variable-outside-the-scope-of-a-handlebars-js-each-loop
var rawTemplateRequestList =
`{{#each dispatch}}
  <div class="data-row row expanded small-12 medium-6 large-6 columns tnt-card-output">
    <div class="">
       <div class="card-divider urgency-{{Urgency}}">
         <div>{{ Vendor }}</div>
         <div>{{Date}}&nbsp;&nbsp;@&nbsp;&nbsp;{{DateTime}}</div>
       </div>
    </div>
    <div class="body">
      <div>{{BranchFrom}}&nbsp;&mdash;>&nbsp;{{BranchTo}}</div>
      <div>{{ CreatedByDisplayName }}</div>
      <div>Reference:&nbsp;{{Reference}}</div>
      <div>Instructions:&nbsp;{{Instructions}}</div>
      <div>Driver:&nbsp;{{Driver}}</div>
    </div>
        <div class="footer">
        <div style="float: left;" class="created-by-uid" title="{{ CreatedByUID }}" data-status="{{ Status }}">
          <a class="editLink" data-open="requestEdit" title="actionRequestEdit" onClick="dispatchEditFormDataLoad(this.id); getIdKey(this.id);" id="{{@key}}">Edit</a>
        </div>
        {{#if ../showDeleteLink }}
          <div style="float: right;">
            <a data-open="requestDelete" title="actionRequestDelete" onClick="dispatchDeleteLoadConfirmForm(this.id);" id="{{@key}}">Delete</a>
          </div>
        {{/if}}
      </div>
  </div>
{{/each}}`;

/*******************************************************************************
 * Dispatch Data
*******************************************************************************/
// Listen for Child Events: https://firebase.google.com/docs/database/web/lists-of-data#listen_for_child_events
// Query data https://firebase.google.com/docs/reference/js/firebase.database.Query

// Cookie/Token Authentication: Sign In with Auth Token so can pull Firebase Data from Front-end
var authToken = Cookies.get('fb-auth-token');
firebase.auth().signInWithCustomToken(authToken)
.then(function() {

  // Requested Dispatch Items
  var dbRefRequested = firebase.database().ref().child('dispatch').orderByChild('Status').equalTo('requested');

  dbRefRequested.on('value', gotData => {
    handleData('#requested', gotData);
  });

  // Dispatched Dispatch Items
  var dbRefDispatched = firebase.database().ref().child('dispatch').orderByChild('Status').equalTo('dispatched');

  dbRefDispatched.on('value', gotData => {
    handleData('#dispatched', gotData);
  });

});


/*******************************************************************************
 * Handlebars Compile + Render
*******************************************************************************/
// FYI - Node.js is needed if I want to pre-compile templates
var compiledTemplate = Handlebars.compile(rawTemplateRequestList);

function handleData(parentSelector, gotData) {

  var parentDiv = $(parentSelector);
  // clear the records so when value is updated new records are displayed (see bottom of code)
  parentDiv.empty();
  // assign above data to 'dataVal'
  var dataVal = gotData.val();
  // pass the data to the handlebars template (up above)
  // about the '../' in the above {{# if ../ }}
  // required when using handlebars template in separate .js file outside of .hbs node express
  // 'showDelete' is coming from top of this file, not the dispatch.js route file
  var data = { showDeleteLink: showDelete, dispatch: dataVal };
  var html = compiledTemplate(data);

  parentDiv.append(html);



  //////////////////////////////////////////////////////////////////////////////
  // Hide 'Edit' link if Not Admin and currentUID is-not-equal-to CreatedByUID
  //////////////////////////////////////////////////////////////////////////////
  // get currentUID
  var currentUID = firebase.auth().currentUser.uid;

  if (!isAdmin) {
    // get record 'created-by-uid' from the surrounding <div> title
    var requestCreatedByUIDs = document.getElementsByClassName("created-by-uid");
    for (var i = 0; i < requestCreatedByUIDs.length; i++) {
      if (currentUID !== requestCreatedByUIDs[i].title) {
        requestCreatedByUIDs[i].className += " hide";
      }
    }
  }
  if (isBasic) {
  // if Basic user, hide 'edit' link on all 'Dispatched' records
    var gotDispatched = $("div[data-status='dispatched']");
    console.log("Got Dispatched? ", gotDispatched);
    for (var i = 0; i < gotDispatched.length; i++) {
      gotDispatched[i].className += " hide";
    }
  }
}

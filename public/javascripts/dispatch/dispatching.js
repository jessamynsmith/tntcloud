
// User Role Cookie + Role
var userRole = Cookies.get('userRole');
switch (userRole) {
  case "admin" :
    var isAdmin = true;
    break;
  case "basic" :
    var isBasic = true;
    break;
  case "dispatch_jax" :
    var isDispatchRoleJAX = true;
    break;
  case "dispatch_nfws" :
    var isDispatchRoleNFWS = true;
    break;
  case "dispatch_lc" :
    var isDispatchRoleLC = true;
    break;
  case "dispatch_wc" :
    var isDispatchRoleWC = true;
    break;
  case "dispatch_440" :
    var isDispatchRole440 = true;
    break;
  default :
    var isBasic = "basic";
}

// show Delete link?
var showDeleteLink = false;
if (isAdmin) {
  showDeleteLink = true;
}

// show Received link?
var showReceivedLink = false;
if (isAdmin ||
    isDispatchRoleJAX && isDispatchURL_JAX ||
    isDispatchRoleNFWS && isDispatchURL_NFWS ||
    isDispatchRoleLC && isDispatchURL_LC ||
    isDispatchRoleWC && isDispatchURL_WC ||
    isDispatchRole440 && isDispatchURL_440 ) {
  showReceivedLink = true;
}

/*******************************************************************************
* Handlebars
*******************************************************************************/
// #if ../isAdmin, #if ../showDelete
// https://stackoverflow.com/questions/13645084/access-a-variable-outside-the-scope-of-a-handlebars-js-each-loop
var rawTemplateRequestList =
`{{#each dispatch}}
  <div class="tnt-card-output {{ BranchFrom }} {{ BranchTo }}" >
    <div class="card-header">
       <div class="card-divider urgency-{{Urgency}}">
         <div class="data-item">{{ Vendor }}</div>
         <div class="data-item">{{Date}}&nbsp;&nbsp;@&nbsp;&nbsp;{{DateTime}}</div>
       </div>
    </div>
    <div class="body">
      <div class="data-item">{{BranchFrom}}&nbsp;&mdash;>&nbsp;{{BranchTo}}</div>
      <div class="data-item">{{ CreatedByDisplayName }}</div>
      <div class="data-item">Ref:&nbsp;{{Reference}}</div>
      <div class="data-item">Inst:&nbsp;{{Instructions}}</div>
      <div class="data-item">Driver:&nbsp;{{Driver}}</div>
    </div>
    <div class="footer">
      <div class="action-link edit-link" title="{{ CreatedByUID }}" data-status="{{ Status }}">
        <a class="editLink" data-open="requestEdit" title="actionRequestEdit" onClick="dispatchEditFormDataLoad(this.id); getIdKey(this.id);" id="{{@key}}">Edit</a>
      </div>
      {{#if ../showDeleteLink }}
      <div class="action-link delete-link">
        <a data-open="requestDelete" title="actionRequestDelete" onClick="dispatchDeleteLoadConfirmForm(this.id);" id="{{@key}}">Delete</a>
      </div>
      {{/if}}
      {{#if ../showReceivedLink }}
      <div class="action-link received-link">
        <a data-open="requestReceived" title="actionRequestReceived" onClick="dispatchReceivedLoadConfirmForm(this.id);" id="{{@key}}">RECEIVED</a>
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
  var data = { showDeleteLink: showDeleteLink, showReceivedLink: showReceivedLink, dispatch: dataVal };
  var html = compiledTemplate(data);

  parentDiv.append(html);

  //////////////////////////////////////////////////////////////////////////////
  // 'Edit' Link: Show/Hide
  //////////////////////////////////////////////////////////////////////////////
  // get currentUID
  var currentUID = firebase.auth().currentUser.uid;

  if (
      isDispatchRoleJAX && isDispatchURL_JAX ||
      isDispatchRoleNFWS && isDispatchURL_NFWS ||
      isDispatchRoleLC && isDispatchURL_LC ||
      isDispatchRoleWC && isDispatchURL_WC ||
      isDispatchRole440 && isDispatchURL_440
    ) {
    var editLinks = document.getElementsByClassName("edit-link");
    for (var i = 0; i < editLinks.length; i++) {
      editLinks[i].className += " show";
    }
  }

  if (!isAdmin) {
    // EDIT Links
    // get record's 'created-by-uid' from the edit link's <div> title attribute
    var editLinks = document.getElementsByClassName("edit-link");
    for (var i = 0; i < editLinks.length; i++) {
      // if currentUID not equal to edit link's title-attribute {{ CreatedByUID }}
      if (currentUID !== editLinks[i].title) {
        editLinks[i].className += " hide";
      }
    }
  }
  if (isBasic) {
    // EDIT Links
    // if Basic user, hide 'edit' link on all 'Dispatched' records
    var gotDispatched = $("div[data-status='dispatched']");
    //console.log("Got Dispatched? ", gotDispatched);
    for (var i = 0; i < gotDispatched.length; i++) {
      gotDispatched[i].className += " hide";
    }
  }
  if (showReceivedLink) {
    var receivedLinks = document.getElementsByClassName("received-link");
    for (var i = 0; i < receivedLinks.length; i++) {
      receivedLinks[i].classList.remove("hide");
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Branch Dropdown Selector: Show/Hide by Branch To/From
  //////////////////////////////////////////////////////////////////////////////
  // get the select branch element and add event listener
  var selectBranch = document.getElementById("selectBranch");
  selectBranch.addEventListener("change", function() {
    switch(selectBranch.value) {
      // show all records
      case "allBranches" :
        window.location.href = `/dispatch/dispatching`;
        break;
      // show JAX records
      case "JAX" :
        window.location.href = `/dispatch/dispatching/jax`;
        break;
      // show NFWS records
      case "NFWS" :
        window.location.href = `/dispatch/dispatching/NFWS`;
        SelectElement("NFWS");
        break;
      // show LC records
      case "LC" :
        window.location.href = `/dispatch/dispatching/LC`;
        SelectElement("LC");
        break;
      // show WC records
      case "WC" :
        window.location.href = `/dispatch/dispatching/WC`;
        SelectElement("WC");
        break;
      // show 440 records
      case "440" :
        window.location.href = `/dispatch/dispatching/440`;
        SelectElement("440");
        break;
      // show all records by default
      default :
      $.each(allDispatchRecords, function() {
        this.classList.remove("hide");
      });
    } // end switch
  }); // end selectBranch.addEventListener
}

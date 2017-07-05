
// Cookie/Token authentication
var userRole = Cookies.get('userRole');
console.log("User Role Cookie ", userRole);
var isAdmin = userRole === 'admin';
console.log("User Role ", isAdmin);

/***************************************
* Handlebars
***************************************/
// Handlebars #if ../isAdmin :: https://stackoverflow.com/questions/13645084/access-a-variable-outside-the-scope-of-a-handlebars-js-each-loop
var rawTemplate =
`{{#each dispatch}}
  <div class="data-row row expanded small-12 medium-6 large-6 columns tnt-card-output" id="{{@key}}">
    <div class="">
       <div class="card-divider">
         <div>{{ Vendor }}</div>
         <div>{{Date}}&nbsp;&nbsp;@&nbsp;&nbsp;{{DateTime}}</div>
       </div>
    </div>
    <div class="body">
      <div>From:&nbsp;{{BranchFrom}}&nbsp;&nbsp;&nbsp;&nbsp;To:&nbsp;{{BranchTo}}</div>
      <div>Reference:&nbsp;{{Reference}}</div>
      <div>Instructions:&nbsp;{{Instructions}}</div>
      <div>Driver:&nbsp;{{Driver}}</div>
    </div>
    {{#if ../isAdmin }}
      <div class="footer">
        <div style="float: left;"><a data-open="dispatch-form">Edit</a></div>
        <div style="float: right;">Delete</div>
      </div>
    {{/if}}
  </div>
{{/each}}`;

/*****************************************************************************
 * Form Popup
*****************************************************************************/
function myFunction() {
    var txt;
    var person = prompt("Please enter your name:", "Harry Potter");
    if (person == null || person == "") {
        txt = "User cancelled the prompt.";
    } else {
        txt = "Hello " + person + "! How are you today?";
    }
    document.getElementById("demo").innerHTML = txt;
}

/*****************************************************************************
 * Handlebars Compile + Render
*****************************************************************************/
// FYI - Node.js is needed if I want to pre-compile templates
var compiledTemplate = Handlebars.compile(rawTemplate);

function handleData(parentSelector, gotData) {
  var parentDiv = $(parentSelector);
  // clear the records so when value is updated new records are displayed (see bottom of code)
  parentDiv.empty();
  // assign above data to 'dataVal'
  var dataVal = gotData.val();
  // pass the data to the handlebars template (up above)
  var data = { isAdmin: isAdmin, dispatch: dataVal };
  var html = compiledTemplate(data);

  parentDiv.append(html);
}

/*****************************************************************************
 * Dispatch Data
*****************************************************************************/
// Listen for Child Events: https://firebase.google.com/docs/database/web/lists-of-data#listen_for_child_events
// Query data https://firebase.google.com/docs/reference/js/firebase.database.Query

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

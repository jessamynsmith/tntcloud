
/*********************************
* p5 JS Library Initializer
*********************************/
function setup() {}
/********************************/

/*****************************************************************************
 * Dispatch Status = 'Dispatched'
*****************************************************************************/
// Listen for Child Events: https://firebase.google.com/docs/database/web/lists-of-data#listen_for_child_events
// Query data https://firebase.google.com/docs/reference/js/firebase.database.Query

// var dbRefRequested = firebase.database().ref().child('dispatch').orderByChild('Status').equalTo('requested');
// var dbRef = firebase.database().ref().child('dispatch');

// Cookie/Token authentication
var userRole = Cookies.get('userRole');
console.log("User Role Cookie ", userRole);
var isAdmin = userRole === 'admin';
console.log("User Role ", isAdmin);

// var dbRef = firebase.database().ref().child('dispatch');

var dbRef = firebase.database().ref().child('dispatch').orderByChild('Status').equalTo('requested');

dbRef.on('value', gotData => {
  // clear the records so when value is updated new records are displayed (see bottom of code)
  var dataRows = selectAll('.data-row');
  for (var i = 0; i < dataRows.length; i++) {
    dataRows[i].remove();
  }

  // assign above core data to 'data'
  var dataVal = gotData.val();

  /***************************************
  * Handlebars
  ***************************************/
  //  var rawTemplate = document.getElementById("rowsTemplate").innerHTML;
  // Handlebars #if ../isAdmin :: https://stackoverflow.com/questions/13645084/access-a-variable-outside-the-scope-of-a-handlebars-js-each-loop
  var rawTemplate =
  `{{#each dispatch}}
    <div class="data-row row expanded small-12 medium-6 large-6 columns tnt-card-output">
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
          <div style="float: left;">Edit</div>
          <div style="float: right;">Delete</div>
        </div>
      {{/if}}
    </div>
  {{/each}}`;
  // Node.js is needed if I want to pre-compile templates
  var compiledTemplate = Handlebars.compile(rawTemplate);

  // pass the array data values
  var data = { isAdmin: isAdmin, dispatch: dataVal };
  var html = compiledTemplate(data);

  // add html output to ID
  document.getElementById('requested').innerHTML += html;

}); // End gotData(data)

  /*****************************************************************************
   * Retrieve People Records from Database
  *****************************************************************************/
  var ref = database.ref('people');
  // ref.on is firebase method for keeping live data, and 'value' is saying you want values
  ref.once('value', gotData, errData);

  function gotData(data) {
    // assign above warranty data to 'warranty'
    var people = data.val();
    // Firebase keys/records: assign the warranty object's Firebase keys to 'keys'
    var keys = Object.keys(people);
    // Loop through all the Keys/records
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      // Extract data from each Key record
      var PersonName = people[k].PersonName;

      /*************************************************************************
       * Build Table Rows from Data Values
       ************************************************************************/
      /********** Create <td>'s *************/
      // create <td>
      var tdPersonName = document.createElement('td');
      var tPersonName = document.createTextNode(PersonName);
      tdPersonName.appendChild(tPersonName);

      /******** Create Delete Link ***********/
      var a = document.createElement('a');
      a.className += 'button list-record';
      a.id = k;
      var linkText = document.createTextNode('Delete Person');
      a.appendChild(linkText);
      a.href = `peopledelete.html?KEY=${k}`;
      var tdLink = document.createElement('td');
      tdLink.appendChild(a);

      /********** Build <tr> ***************/
      var tr = document.createElement('tr');
      tr.className += 'data-row';
      // add <td>'s as children of a <tr>
      tr.appendChild(tdPersonName);
      tr.appendChild(tdLink);
      document.getElementById("people-list").appendChild(tr);

    } // End for Loop

    /***************************************************************************
     * Sort Table Rows
     **************************************************************************/
    var myArray = [];
    var listElements = document.getElementsByClassName("data-row");

    for (var i = 0; i < listElements.length; i++) {
      trINNER = listElements[i].innerHTML;
      myArray.push(trINNER);
    }

    myArray.sort(function(x,y){
        var a = String(x);
        var b = String(y);
       if (a > b)     {
           return 1
       }    else  if (a < b) {
           return -1
       }    else    {
           return 0;
       }
     });

    for (var i = 0; i < myArray.length; i++) {
      var trNext = document.createElement('tr');
      trNext.innerHTML = myArray[i];

      document.getElementById("new-people-list").appendChild(trNext);
    }

    document.getElementById("people-list").remove();


  } // End gotData(data)


  function errData(err) {
    console.log('Error!');
    console.log(err);
  }

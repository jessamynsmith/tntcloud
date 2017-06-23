  /*****************************************************************************
   * Build Employees <options> for <select> drop-down with Employee ID + Name
  *****************************************************************************/

  var ref = database.ref('people');
  // ref.on is firebase method for keeping live data, and 'value' is saying you want values
  ref.once('value', gotData);

  var gotPeople = [];

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

      // gotPeople array for use after for loop, in below "Sort Option Names"
      gotPeople.push(people[k].PersonName);
    } // End for loop

    /***************************************************************************
     * Sort Option Names
     **************************************************************************/
    var sortMe = [];
    gotPeople;

    for (var i = 0; i < gotPeople.length; i++) {
      var person = gotPeople[i];
      sortMe.push(person);
    }

    sortMe.sort(function(x,y){
      var a = String(x);
      var b = String(y);
      if (a > b) {
        return 1
      } else  if (a < b) {
          return -1
      } else {
          return 0;
      }
    });
    // re-assign sorted 'sortMe' to 'sortedArray'
    sortedArray = sortMe;

    /***************************************************************************
     * Build <select> <option>'s
     **************************************************************************/

    /*** Turned In By Options *********************/
    for (var i = 0; i < sortedArray.length; i++) {
      var option = document.createElement('option');
      option.value = sortedArray[i];
      option.innerHTML = sortedArray[i];
      document.getElementById("turned-in-by").appendChild(option);
    }

    /*** Received By Options **********************/
    for (var i = 0; i < sortedArray.length; i++) {
      var option = document.createElement('option');
      option.value = sortedArray[i];
      option.innerHTML = sortedArray[i];
      document.getElementById("received-by").appendChild(option);
    }

  } // End gotData

  // console.log(firebase);

/*******************************************************************************
 * Create Core Page
 ******************************************************************************/
router.get('/create-core', function(req, res, next) {
  /*****************************************************************************
   * Build Employees <options> for <select> drop-down with Employee ID + Name
  *****************************************************************************/
  // Sort people/PersonName using Firebase
  dbRef.child('/people/').orderByChild('PersonName').on('value', gotData);

  function gotData(data) {
    var gotPeople = [];

    data.forEach(function(data) {
      gotPeople.push(data.val());
    });
    // Question) Why won't this line work if it's below the closing '};' of the gotData function, even though I have global variable var myData
    // Answer) because the page render will happen faster than the data collection, so need to render to template after data collected
    // handlebars object: templateData: templateData === anyName: variableName
    res.render('core-warranty/create-core', { gotPeople: gotPeople, navCW: navCW } );
  };
});

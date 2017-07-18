
// due to switching between urls, need to set isDispatchURL_XXX url to false 
// for the URLs that are NOT this branch
// originally declared in branch-all.js as false
// then, if a location url is hit, the bottom of this page sets 'true'
isDispatchURL_JAX = false;
isDispatchURL_NFWS = false;
isDispatchURL_LC = false;
isDispatchURL_WC = false;

// Only different between branch-*.js files is in the function call parameter

// After Branch URL Page Load
$(document).ready(function() {
  function SelectElement(valueToSelect) {
    // Set Branch Dropdown Value to selected branch or reverts to default
    var branchToSelect = document.getElementById('selectBranch');
    branchToSelect.value = valueToSelect;
    // Set records parent div class to branch so css can hide/display correct records
    var parentDIV = document.getElementById("dispatchRecords");
    parentDIV.className += " " + valueToSelect;
  }
  SelectElement("440");
});

// originally declared as false in branch-all.js
isDispatchURL_440 = true;


// Only different between branch-*.js files is in the function call parameter

// After Branch URL Page Load
$(document).ready(function() {
  function SelectElement(valueToSelect) {
    // Set Branch Dropdown Value to selected branch or reverts to default
    var branchToSelect = document.getElementById('selectBranch');
    branchToSelect.value = valueToSelect;
    // Set records parent div class to branch to css can hide/display correct records
    var parentDIV = document.getElementById("dispatchRecords");
    parentDIV.className += " " + valueToSelect;
  }
  SelectElement("440");
});
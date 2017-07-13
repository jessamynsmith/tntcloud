
// Select Branch set to "NFWS"
$(document).ready(function() {
  function SelectElement(valueToSelect) {
    // Select Branch
    var branchToSelect = document.getElementById('selectBranch');
    branchToSelect.value = valueToSelect;
    // Set CSS Class
    var d = document.getElementById("dispatchRecords");
    d.className += " " + valueToSelect;
  }
  SelectElement("NFWS");
});

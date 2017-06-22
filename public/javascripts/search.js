
// https://stackoverflow.com/questions/9127498/how-to-perform-a-real-time-search-and-filter-on-a-html-table

function searchTable() {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("search-form");
    filter = input.value.toUpperCase();
    table = document.getElementById("records-list");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
}

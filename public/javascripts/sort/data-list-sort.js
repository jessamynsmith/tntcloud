
/***************************************************************************
 * Alphabetically Sort Table Rows 
 **************************************************************************/
var myArray = [];
var listElements = document.getElementsByClassName("data-row");
console.log("List Elements ", listElements);

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

  document.getElementById("data-list-sorted").appendChild(trNext);
}

document.getElementById("data-list-pre-sorted").remove();

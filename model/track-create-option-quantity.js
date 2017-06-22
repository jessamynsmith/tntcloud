/*****************************************************************************
 * Quantity Options
*****************************************************************************/

for (var i = 1; i <= 100; i++) {
  var option = document.createElement('option');
  option.value = [i];
  option.innerHTML = [i];
  document.getElementById("quantity").appendChild(option);
}

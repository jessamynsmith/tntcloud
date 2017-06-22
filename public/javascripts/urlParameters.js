
/*****************************************************************************
  * Get URL Parameters
*****************************************************************************/
// https://coderexample.com/fetch-query-string-parameters-from-url-in-javascript/

window.location.href; // coderexample.html?post_id=239&category=Angular
window.location.href.slice(window.location.href.indexOf('?') + 1) // post_id=239&category=Angular
var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'); // ["id=239", "category=Angular"]
var params;
for (var i=0;i<url.length;i++) {
    params = url[i].split("=");
}

// console.log(params[0]); //239
// console.log(params[1]); //Angular
function getParam(param) {
  var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i=0;i<url.length;i++) {
          var params = url[i].split("=");
          if(params[0] == param)
          return params[1];
  }
  return false;
}

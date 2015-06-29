'use strict';

//var app = angular.module('SpotMyDiveApp', ['ngMaterial', 'spots']);
var app = angular.module('SpotMyDiveApp', ['ngMaterial', 'SpotMyDiveControllers', 'SpotMyDiveServices']);

app.filter('deepBetween', function(){
  return function(items, min, max) {
   // alert(min);
   // alert(max);
      var filtered = [];
      angular.forEach(items, function(item, key) {
        if(item.profondeurMax <= max && item.profondeurMax >= min) {
            filtered.push(item);
          }
      });
      return filtered;
  };
});
/*
app.config(function($mdThemingProvider) {

    // Use the 'brown' theme - override default 'blue' theme
    $mdThemingProvider.theme('default')
        .primaryColor('brown')
        .accentColor('brown');

});

*/

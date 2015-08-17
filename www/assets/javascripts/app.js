'use strict';

//var app = angular.module('SpotMyDiveApp', ['ngMaterial', 'spots']);
var app = angular.module('SpotMyDiveApp', ['ngMaterial', 'SpotMyDiveControllers', 'SpotMyDiveServices']);

app.filter('spotFilter', function(){
  return function(items, min, max, zone) {
   // alert(min);
   // alert(max);
      var filtered = [];
      angular.forEach(items, function(item, key) {
        //if pour la profondeur
        if(item.profondeurMax <= max && item.profondeurMax >= min) {
          // if pour la zone
          if(zone == null || zone == 'Tous'){
            filtered.push(item);
          }else if(item.zoneGeographique == zone){
              filtered.push(item);
            }
          }
      });
      return filtered;
  };
});

/** Old filter on deep property
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
*/

/*
app.config(function($mdThemingProvider) {

    // Use the 'brown' theme - override default 'blue' theme
    $mdThemingProvider.theme('default')
        .primaryColor('brown')
        .accentColor('brown');

});

*/
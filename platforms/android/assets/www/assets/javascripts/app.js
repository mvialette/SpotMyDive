'use strict';

//var app = angular.module('SpotMyDiveApp', ['ngMaterial', 'spots']);
var app = angular.module('SpotMyDiveApp', ['ngMaterial', 'ngRoute', 'SpotMyDiveControllers', 'SpotMyDiveServices']);

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

app.filter('distinctSpotPlaceFilter', function(){
  return function(items) {

      var filtered = [];
      angular.forEach(items, function(item, key) {
        //if pour la profondeur
        if(filtered.indexOf(item.zoneGeographique) == -1) {
          filtered.push(item.zoneGeographique);
        }
      });
      return filtered;
  };
});

app.config(function($routeProvider) {

    $routeProvider.
      when('/List', {
        templateUrl: 'partials/list.html'
      //controller: 'AppCtrl'
      }).
      when('/Map', {
        templateUrl: 'partials/map.html',
        controller: 'MapCtrl'
      }).
      when('/Spot/:spotId', {
        templateUrl: 'partials/spot/detail.html',
        controller: 'SpotCtrl'
      }).
      when('/Spot/:spotId/GPS', {
        templateUrl: 'partials/spot/gps.html',
        controller: 'SpotCtrl'
      }).
     when('/About', {
        templateUrl: 'partials/about.html'
      }).
      otherwise({
        redirectTo: '/List'
      });
  });
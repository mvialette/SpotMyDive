'use strict';

/**
 * Global methods
 *
 */
var parseDate = function(dateObject){
    var theDate = new Date(parseInt(dateObject));
    return theDate.getDate() + "/" + (theDate.getMonth() + 1) + "/"
        + theDate.getFullYear(); // jQuery.datepicker.parseDate(
    // "yy-mm-dd", d);
};

var logMessage = function(message) {
    var debug = false;
    //var debug = true;

    if (debug === true) {
        alert(message);
    }
}

var formatTimestamp = function(d) {
    // padding function
    var s = function(p) {
        return ('' + p).length < 2 ? '0' + p : '' + p;
    };

    var dateTmp = null;
    // default parameter
    if (typeof d === 'undefined') {
        dateTmp = new Date();
    } else if (typeof d === 'number') {
        dateTmp = new Date(d);
    } else if (typeof d === 'string') {
        dateTmp = new Date(parseInt(d));
    }

    return s(dateTmp.getDate()) + '/' + s(dateTmp.getMonth() + 1) + '/'
        + dateTmp.getFullYear();
}

/**
 * End of global methods
 */

var appServices = angular.module('SpotMyDiveServices', []);

appServices.factory('SpotDataService', ['$q', '$http', function($q, $http){

     var getAllSpots = function(){
         /*
       var spots = [];

      $http.get('./assets/json/spots.json')
          .then(function(results) {
              spots = results;
          });
          */
        var spots = [
              {
                  name : 'Arche-de-planier',
                  classname: 'svg-1',
                  GPS: {
                      latitude :  43.197966666667,
                      longitude : 5.2235666666667,
                      valide : false
                  },
                  description : '43°11.878’ N 05°13.414’ E (WGS84)',
                  profondeurMax : '50 m',
                  zoneInteret : '40m-50m',
                  icone : 'tombant-40-60',
                  zoneGeographique : 'Marseille'
              },
              {
                  name : 'Chaouen',
                  classname : 'svg-1',
                  GPS : {
                      latitude :  43.1985,
                      longitude : 5.2283333333333,
                      valide : false
                  },
                  description : '43°11.910’ N 05°13.700’ E (WGS84)',
                  profondeurMax : '36 m',
                  zoneInteret : '6-36 m',
                  icone : 'epave-20-40',
                  zoneGeographique : 'Marseille'
              }
          ];

         return spots;
     }

      return {
          getAllSpots:getAllSpots
      }
  }]);


'use strict';

var appControllers = angular.module('SpotMyDiveControllers', []);

appControllers.controller('SpotMyDiveCtrl', ['$scope', '$mdSidenav', '$filter', '$mdDialog','SpotDataService',
    function($scope, $mdSidenav, $filter, $mdDialog, SpotDataService){

        //$scope.spots = SpotDataService.getAllSpots();

        //var imagePath = 'img/list/60.jpeg';

        $scope.currentActiveZone = null;

        $scope.zones = [];
        $scope.zones.push('Tous');
        $scope.zones.push('Banyuls');
        $scope.zones.push('Marseille');
        $scope.zones.push('La Ciotat');
        $scope.zones.push('Les Lecques');
        $scope.zones.push('Bandol');

        //.map(function (zone) { return { abbrev: zone }; });
        $scope.criteria = {};
        $scope.criteria.modePresentation = 'Liste';

        $scope.isModeListe = function() {
          return $scope.criteria.modePresentation == 'Liste';
        };

        $scope.deepLimits = {};
        $scope.deepLimits.deepLowerThan20 = true;
        $scope.deepLimits.deep20To40 = true;
        $scope.deepLimits.deep40To60 = true;

        $scope.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };


        $scope.reinitMap = function() {
            // on fixe sur marseille par default
            var mapLatLng = new google.maps.LatLng(43.207966677667, 5.3335666776667);
            var currentZoom = 11;

            // ensuite on essaye de déterminer quel localité nous avons selectionné
            if($scope.currentActiveZone == 'Marseille'){
               mapLatLng = new google.maps.LatLng(43.207966677667, 5.3335666776667);
              currentZoom = 11;
            }else if($scope.currentActiveZone == 'La Ciotat'){
               mapLatLng = new google.maps.LatLng(43.168010, 5.611206);
              currentZoom = 14;
            }else if($scope.currentActiveZone == 'Banyuls'){
              mapLatLng = new google.maps.LatLng(42.517469, 3.136982);
              currentZoom = 12;
            }else if($scope.currentActiveZone == 'Les Lecques'){
              mapLatLng = new google.maps.LatLng(43.154286, 5.692900);
              currentZoom = 13;
            }else if($scope.currentActiveZone == 'Bandol'){
              mapLatLng = new google.maps.LatLng(43.132090, 5.741325);
              currentZoom = 14;
            }

            var mapOptions = {
              center: mapLatLng,
              zoom: currentZoom
            }

            $scope.map = new google.maps.Map(
              document.getElementById("map-canvas"), mapOptions
            );

            $scope.mapPlaces = new google.maps.places.PlacesService($scope.map);
        };

        var previousInfoWindow = false;

        $scope.addMarkers = function() {

            var markerIcon0To20 = new google.maps.MarkerImage('img/SpotMyDivePin_green.svg',
                                 null, null, null, new google.maps.Size(32,32));

            var markerIcon20To40 = new google.maps.MarkerImage('img/SpotMyDivePin_yellow.svg',
                                    null, null, null, new google.maps.Size(32,32));

            var markerIcon40To60 = new google.maps.MarkerImage('img/SpotMyDivePin_red.svg',
                                                null, null, null, new google.maps.Size(32,32));

            angular.forEach($scope.spots, function(spotTmp) {

                var latTmp = null;
                var longTmp = null;

                if(latTmp == null && longTmp == null){
                    if (typeof spotTmp.GPS.latitude === 'undefined') {
                      // on a les coordonnées en DMS, on les convertis en décimal
                      latTmp = $scope.parseDMSToDD(spotTmp.GPS.WGS84, 'Lat');
                      longTmp = $scope.parseDMSToDD(spotTmp.GPS.WGS84, 'Long');
                    }else{
                      // les coordonnées GPS sont déjà en décimal
                      latTmp = spotTmp.GPS.latitude;
                      longTmp = spotTmp.GPS.longitude;
                    }
                  }

                var spotCoordinates = new google.maps.LatLng(latTmp, longTmp);

              var currentMarkerIcon = null;

              if(spotTmp.profondeurMax <= 20){
                currentMarkerIcon = markerIcon0To20;
              }else if(spotTmp.profondeurMax <= 40){
                currentMarkerIcon = markerIcon20To40;
              }else if(spotTmp.profondeurMax <= 60){
                  currentMarkerIcon = markerIcon40To60;
              }

              var spotMarker = new google.maps.Marker({
                position: spotCoordinates,
                map: $scope.map,
                icon: currentMarkerIcon,
                optimized:false,
                title: spotTmp.name
              });

              var spotContentString = '<div id="content">'+
                      '<h1 id="spotTitle">'+spotTmp.name+'</h1>'+
                      '<div id="bodyContent">'+
                      '<p>'+spotTmp.description+'</p>' +
                      '<p> See more...</p>'
                      '</div>'+
                      '</div>';

                /*
              var spotInfoWindow = new google.maps.InfoWindow({
                content: spotContentString
              });
              */

              google.maps.event.addListener(spotMarker, 'click', $scope.makeInfoWindowListener(spotMarker, spotContentString));
            });//fin du forEach
          };

          $scope.makeInfoWindowListener = function (pMarker, pContent) {
              return function() {

                if(previousInfoWindow){
                  previousInfoWindow.close();
                }

                 var infoWindow = new google.maps.InfoWindow({
                  content:pContent
                 });

                  previousInfoWindow = infoWindow;

                  infoWindow.open($scope.map,pMarker);
              };
            }


        $scope.validerCriterias = function(){
           /*
           alert('deepLimits-20:' + $scope.deepLimits.deepLowerThan20);
           alert('deepLimits20-40:' + $scope.deepLimits.deep20To40);
           alert('deepLimits40-60:' + $scope.deepLimits.deep40To60);

           alert('zone:' + $scope.currentActiveZone);
           */
           $mdSidenav('left').toggle();

           var minRange = 0;
           if($scope.deepLimits.deepLowerThan20 == true){
             minRange = 0;
           }else if($scope.deepLimits.deep20To40 == true){
             minRange = 20;
           }else{
             minRange = 40;
           }

           var maxRange = 60;
           if($scope.deepLimits.deep40To60 == true){
             maxRange = 60;
           }else if($scope.deepLimits.deep20To40 == true){
             maxRange = 40;
           }else{
             maxRange = 20;
           }

            $scope.spots = $filter('spotFilter')(SpotDataService.getAllSpots(),minRange, maxRange, $scope.currentActiveZone);

           if($scope.criteria.modePresentation == 'Carte'){
              $scope.reinitMap();
              $scope.addMarkers();
           }
         };

         $scope.toGPSWGS84InDMD = function(spotTmp){
             var resultInDMD = null;

              if (typeof spotTmp.GPS.WGS84 === 'undefined') {
                if (typeof spotTmp.GPS.latitude === 'undefined' || typeof spotTmp.GPS.longitude === 'undefined') {
                  resultInDMD = '';
                }else{
                  var latTmp = spotTmp.GPS.latitude;
                  var longTmp = spotTmp.GPS.longitude;

                  var latString = $scope.convertDDToDMS(latTmp, 'Lat');
                  var longString = $scope.convertDDToDMS(longTmp, 'Long');

                  resultInDMD = latString + ' ' + longString;
                }

              }else{
                resultInDMD = spotTmp.GPS.WGS84;
              }

             return resultInDMD;
           }

           //== Methods ==//
           $scope.parseDMS = function(input){

             //alert(input);
             var parts = input.split(/[^\d\w]+/);

             var degreeNorth = parts[0];
            //alert('degreeNorth='+degreeNorth);

             var minuteNorth = parts[1];
            //alert('minuteNorth='+minuteNorth);

             var secondNorth = parts[2];
            //alert('secondNorth='+secondNorth);

             var directionNorth = parts[3];
          //alert('directionNorth='+directionNorth);

             var convertedLat = $scope.convertDMSToDD(degreeNorth, minuteNorth, secondNorth, directionNorth);
             //alert('convertedLat'+convertedLat);

             var degreeEast = parts[4];
            //alert('degreeEast='+degreeEast);

             var minuteEast = parts[5];
            //alert('minuteEast='+minuteEast);

             var secondEast = parts[6];
            //alert('secondEast='+secondEast);

             var directionEast = parts[7];
          //alert('directionEast='+directionEast);

             var convertedLng = $scope.convertDMSToDD(degreeEast, minuteEast, secondEast, directionEast);

             return 'lat='+convertedLat + ', long='+convertedLng;

             //var lng = convertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
             //alert(lng);
           };

            $scope.parseDMSToDD = function(input, latitudeOrLongitude){

             //alert(input);
             var parts = input.split(/[^\d\w]+/);

              var convertedValue = null;

              if(latitudeOrLongitude == 'Lat'){
                var degreeNorth = parts[0];
              //alert('degreeNorth='+degreeNorth);

               var minuteNorth = parts[1];
              //alert('minuteNorth='+minuteNorth);

               var secondNorth = parts[2];
              //alert('secondNorth='+secondNorth);

               var directionNorth = parts[3];
            //alert('directionNorth='+directionNorth);

               convertedValue = $scope.convertDMSToDD(degreeNorth, minuteNorth, secondNorth, directionNorth);
              }else{
                //alert('convertedLat'+convertedLat);

             var degreeEast = parts[4];
            //alert('degreeEast='+degreeEast);

             var minuteEast = parts[5];
            //alert('minuteEast='+minuteEast);

             var secondEast = parts[6];
            //alert('secondEast='+secondEast);

             var directionEast = parts[7];
          //alert('directionEast='+directionEast);

               convertedValue = $scope.convertDMSToDD(degreeEast, minuteEast, secondEast, directionEast);
              }

             return convertedValue;

             //var lng = convertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
             //alert(lng);
           };

           $scope.convertDMSToDD = function(degrees, minutes, millisecond, direction) {
          //alert('millisecond'+millisecond+', seconds'+seconds);
             var min = minutes + '.' + millisecond;
             //alert(min);
             //alert(min/60);
             var dd = parseFloat(degrees) + parseFloat(min/60);
             //alert(dd);
             //var dd = degrees + minutes/60 + Math.round(seconds/(60*60));

             if (direction == "S" || direction == "W") {
                 dd = dd * -1;
             } // Don't do anything for N or E
             return dd;
           }

           $scope.convertDDToDMS = function(value, latOrLong) {

             var degree = Math.floor(value);

             var reste = parseFloat(value) - degree;

             var min = reste * 60;
             var minRoundTo3 = $filter('number')(min, 3);

             var direction = 'N';
             if(latOrLong == 'Lat'){
               direction = 'N';
             }else if(latOrLong == 'Long'){
               direction = 'E';
             }

             return degree+'°'+minRoundTo3+'\' '+direction;
           }

           $scope.spotToString = function(oneSpot) {
                 return $scope.parseDMS(oneSpot.GPS.wgs84);
             };

           /**
         Module pour le calcul de distance
         */
         $scope.toRad = function(n) {
           return n * Math.PI / 180;
         };

         $scope.getDistance = function(fromLat, fromLon, toLat, toLon) {
           /*
           var fromLat = from[0];
           var fromLon = from[1];
           var toLat = to[0];
           var toLon = to[1];
           */
           // return 'fromLat='+fromLat+'fromLon='+fromLon+'toLat'+toLat+'toLon'+toLon;

           var dLat = $scope.toRad(toLat - fromLat);
           var dLon = $scope.toRad(toLon - fromLon);
           var fromLat = $scope.toRad(fromLat);
           var toLat = $scope.toRad(toLat);

           //return 'dLat='+dLat+'dLon='+dLon+'fromLat'+fromLat+'toLat'+toLat;

           var a = Math.pow(Math.sin(dLat / 2), 2) +
                   (Math.pow(Math.sin(dLon / 2), 2) * Math.cos(fromLat) * Math.cos(toLat));
           var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
           var RADIUS = 6371;
           return RADIUS * c;

         };

        //$scope.spots = $filter('deepBetween')(SpotDataService.getAllSpots(),0, 60);
        $scope.spots = $filter('spotFilter')(SpotDataService.getAllSpots(),0, 60);

        $scope.spotDetail = function(item) {
        //$scope.spotDetail = function(item,ev) {
        $mdDialog.show(
           $mdDialog.alert()
             .parent(angular.element(document.body))
             .title(item.name)
             .content($scope.spotToString(item))
             .ariaLabel('Alert Dialog Demo')
             .ok('Close')
             .targetEvent(item)
         );

/** before 29/07/2015
            $mdDialog.show({
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                template: '<md-dialog>' +
                    '<md-dialog-content>'+
                    $scope.spotToString(item) +
                    '</md-dialog-content>'+
                    '</md-dialog>',
                 controller: function DialogController($scope, $mdDialog) {
                    $scope.closeDialog = function() {
                        $mdDialog.hide();
                    }
                 }
            });

*/
/*
old old
            $mdDialog.show(
              $mdDialog.alert()
                //.parent(angular.element(document.body))
                .title('Spot "'+item.name+ '"')
                .content($scope.spotToString(item))
                .ariaLabel('Alert Dialog Demo')
                .ok('Close')
                .targetEvent(ev)
            );

            */
          };

          $scope.spotToString = function(item) {
                  return 'name:' + item.name + ', ' +
                    '<br />classname:' + item.classname + ', '+
                    'GPS.latitude:'+ item.GPS.latitude + ', '+
                    'GPS.longitude:'+ item.GPS.longitude + ', '+
                    'GPS.valide:'+ item.GPS.valide + ', '+
                    'GPS.WGS84:'+ item.GPS.WGS84 + ', '+
                    'description:'+ item.description + ', '+
                    'profondeurMax:'+ item.profondeurMax + ', '+
                    'zoneInteret:'+ item.zoneInteret + ', '+
                    'icone:'+ item.icone + ', '+
                    'zoneGeographique:'+ item.zoneGeographique;
                    ;
              };
        }]);
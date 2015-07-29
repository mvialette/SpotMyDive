'use strict';

var appControllers = angular.module('SpotMyDiveControllers', []);

appControllers.controller('SpotMyDiveCtrl', ['$scope', '$mdSidenav', '$filter', '$mdDialog','SpotDataService',
    function($scope, $mdSidenav, $filter, $mdDialog, SpotDataService){

        //$scope.spots = SpotDataService.getAllSpots();

        var imagePath = 'img/list/60.jpeg';

        $scope.currentActiveZone = null;

        $scope.zones = [];
        $scope.zones.push('Marseille');
        $scope.zones.push('La Ciotat');
        $scope.zones.push('Banyuls');

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
            var mapLatLng = new google.maps.LatLng(43.207966677667, 5.3335666776667);

                var mapOptions = {
                    center: mapLatLng,
                    zoom: 10
                  //, disableDefaultUI: true
                }

                $scope.map = new google.maps.Map(
                    document.getElementById("map-canvas"), mapOptions
                );

             $scope.mapPlaces = new google.maps.places.PlacesService($scope.map);
        };

        $scope.addMarkers = function() {

            //////////////////////////////////////
            //var markers = [];

            for (var i = 0; i < $scope.spots.length; i++) {

              var spotTmp = $scope.spots[i];

              var spotCoordinates = new google.maps.LatLng(spotTmp.GPS.latitude, spotTmp.GPS.longitude);

              var spotMarker = new google.maps.Marker({
                position: spotCoordinates,
                map: $scope.map,
                title: spotTmp.name
              });

              var spotContentString = '<div id="content">'+
                  '<h1 id="spotTitle">'+spotTmp.name+'</h1>'+
                  '<div id="bodyContent">'+
                  '<p>'+spotTmp.description+'</p>' +
                  '</div>'+
                  '</div>';

              var spotInfoWindow = new google.maps.InfoWindow({
                content: spotContentString
              });

              google.maps.event.addListener(spotMarker, 'click', function() {
                  spotInfoWindow.open($scope.map,spotMarker);
                }
              );
            }//fin du for
          };


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

        //$scope.spots = $filter('deepBetween')(SpotDataService.getAllSpots(),0, 60);
        $scope.spots = $filter('spotFilter')(SpotDataService.getAllSpots(),0, 60);

        $scope.spotDetail = function(item) {
        //$scope.spotDetail = function(item,ev) {
            $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('Spot {'+item.name+ '}')
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
                    'classname:' + item.classname + ', '+
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
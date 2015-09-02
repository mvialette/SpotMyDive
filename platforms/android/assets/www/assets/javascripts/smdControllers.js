'use strict';

var appControllers = angular.module('SpotMyDiveControllers', []);

appControllers.controller('SpotCtrl', ['$scope', '$mdSidenav', '$filter', '$mdDialog', '$routeParams', '$location', 'CacheService', 'SpotDataService', function($scope, $mdSidenav, $filter, $mdDialog, $routeParams, $location, CacheService, SpotDataService) {

  var currentSpotId = $routeParams.spotId;

  $scope.currentSpotDetail = null;

  SpotDataService.getAllSpots().every(function(item, index, _ary) {
    //console.log(index + ": " + value);
    if(item.id == currentSpotId){
        $scope.currentSpotDetail = item;
        CacheService.setCurrentSpot(item);
    }
    return $scope.currentSpotDetail == null;
  });

  $scope.go = function ( path ) {
    $location.path( '/' );
  };

  $scope.closeDetail = function () {
    $scope.go('/');
  };
}]);

appControllers.controller('MapCtrl', ['$scope', '$mdSidenav', '$filter', '$mdDialog', '$location', 'CacheService', 'GPSService', function($scope, $mdSidenav, $filter, $mdDialog, $location, CacheService, GPSService) {

  $scope.go = function () {
    $location.path( '#/Spot/156' );
  };

  $scope.reinitMap = function() {

     // on fixe sur marseille par default
     var mapLatLng = new google.maps.LatLng(43.207966677667, 5.3335666776667);
     var currentZoom = 11;

     // ensuite on essaye de déterminer quel localité nous avons selectionné
     if(CacheService.getPlace() == 'Marseille'){
        mapLatLng = new google.maps.LatLng(43.207966677667, 5.3335666776667);
       currentZoom = 11;
     }else if(CacheService.getPlace() == 'La Ciotat'){
        mapLatLng = new google.maps.LatLng(43.168010, 5.611206);
       currentZoom = 14;
     }else if($scope.currentActiveZone == 'Banyuls'){
       mapLatLng = new google.maps.LatLng(42.517469, 3.136982);
       currentZoom = 12;
     }else if(CacheService.getPlace() == 'Les Lecques'){
       mapLatLng = new google.maps.LatLng(43.154286, 5.692900);
       currentZoom = 13;
     }else if(CacheService.getPlace() == 'Bandol'){
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

    angular.forEach(CacheService.getSpotsToDisplay(), function(spotTmp) {

      var latTmp = null;
      var longTmp = null;

      if(latTmp == null && longTmp == null){

        if (typeof spotTmp.GPS.latitude === 'undefined') {
          // on a les coordonnées en DMS, on les convertis en décimal
          latTmp = GPSService.parseDMSToDD(spotTmp.GPS.WGS84, 'Lat');
          longTmp = GPSService.parseDMSToDD(spotTmp.GPS.WGS84, 'Long');
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
        '<p><a href="#/Spot/' + spotTmp.id + '">See more...</a></p>' +
        '</div>'+
        '</div>';

      google.maps.event.addListener(spotMarker, 'click', $scope.makeInfoWindowListener(spotMarker, spotContentString));
    });//fin du for
  };

  $scope.makeInfoWindowListener = function (pMarker, pContent) {
    return function() {

      if(previousInfoWindow){
        previousInfoWindow.close();
      }

       var infoWindow = new google.maps.InfoWindow({
        content:pContent
         //templateUrl:'detail.html'
       });

        previousInfoWindow = infoWindow;

        infoWindow.open($scope.map,pMarker);
    };
  }

  $scope.reinitMap();
  $scope.addMarkers();
}]);

appControllers.controller('SpotMyDiveCtrl', ['$scope', '$mdSidenav', '$filter', '$mdDialog', '$location', 'SpotDataService', 'CacheService',  'GPSService', function($scope, $mdSidenav, $filter, $mdDialog, $location, SpotDataService, CacheService, GPSService) {

  $scope.go = function ( path ) {
    $location.path( path );
  };

  $scope.goToSpotDetail = function ( spotId ) {
    $location.path( '/Spot/' + spotId );
  };

   $scope.goToCurrentSpotDetail = function () {
    $location.path( '/Spot/' + CacheService.getCurrentSpot().id );
  };

  $scope.goToSpotGPS = function () {
    $location.path( '/Spot/' + CacheService.getCurrentSpot().id + '/GPS');
  };

  //$scope.currentSpotDetail = null;

  // cela sert a alimenter le menu des zones
    $scope.zones = [];
    $scope.zones.push('Tous');

    var allSpotPlaces = $filter('distinctSpotPlaceFilter')(SpotDataService.getAllSpots());

    angular.forEach(allSpotPlaces, function(placeTmp){
      $scope.zones.push(placeTmp);
    });
    /*
  $scope.zones.push('Banyuls');
  $scope.zones.push('Marseille');
  $scope.zones.push('La Ciotat');
  $scope.zones.push('Les Lecques');
  $scope.zones.push('Bandol');
  */

  $scope.criteria = {};
  $scope.criteria.currentActiveZone = 'Tous';

  $scope.selectCurrentActiveZone = function(zone) {
    $scope.criteria.currentActiveZone = zone;
  };

  $scope.criteria.modePresentation = 'Liste';

  $scope.criteria.deepLimits = {};
  $scope.criteria.deepLimits.deepLowerThan20 = true;
  $scope.criteria.deepLimits.deep20To40 = true;
  $scope.criteria.deepLimits.deep40To60 = true;

  //if(CacheService.getSpotsToDisplay() == null){
    var allSpots = $filter('spotFilter')(SpotDataService.getAllSpots(),0, 60);
    CacheService.setSpotsToDisplay(allSpots);
    //var laCiotatSpots = $filter('spotFilter')(SpotDataService.getAllSpots(),0, 40, 'La Ciotat');
    //CacheService.setSpotsToDisplay(laCiotatSpots);
  //}

  $scope.spots = CacheService.getSpotsToDisplay();

  CacheService.setPlace($scope.criteria.currentActiveZone);

  $scope.toggleSidenav = function(menuId) {
    //$scope.currentSpotDetail = null;
    $mdSidenav(menuId).toggle();
  };

  $scope.close = function(){
   $mdSidenav('left').toggle();
  }

  $scope.validerCriterias = function($location){

   $mdSidenav('left').toggle();

   var minRange = 0;
   if($scope.criteria.deepLimits.deepLowerThan20 == true){
     minRange = 0;
   }else if($scope.criteria.deepLimits.deep20To40 == true){
     minRange = 20;
   }else{
     minRange = 40;
   }

   var maxRange = 60;
   if($scope.criteria.deepLimits.deep40To60 == true){
     maxRange = 60;
   }else if($scope.criteria.deepLimits.deep20To40 == true){
     maxRange = 40;
   }else{
     maxRange = 20;
   }

   $scope.spots = $filter('spotFilter')(SpotDataService.getAllSpots(),minRange, maxRange, $scope.criteria.currentActiveZone);
    // utile pour passer cette liste à d'autres controller
   CacheService.setSpotsToDisplay($scope.spots);

   if($scope.criteria.modePresentation == 'Carte'){
     CacheService.setPlace($scope.criteria.currentActiveZone);
     $scope.go('/Map');
   }else if($scope.criteria.modePresentation == 'Liste'){
     $scope.go('/List');
   }else{
     $scope.go('/');
   }
 };

  $scope.spotDecorator = function(item) {
    return 'Prof max : ' + item.profondeurMax + ', Zone : ' + item.zoneGeographique + ', GPS : ' + GPSService.toGPSWGS84InDMD(item);
  };

  $scope.spotDetail = function(item) {
    $scope.currentActiveZone = null;
    $scope.currentSpotDetail = item;
  };

  $scope.closeDetail = function(item) {
    $scope.currentSpotDetail = null;
  }

}]);
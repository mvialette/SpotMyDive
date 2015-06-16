'use strict';

var appControllers = angular.module('SpotMyDiveControllers', []);

appControllers.controller('SpotMyDiveCtrl', ['$scope', '$mdSidenav', '$mdBottomSheet', '$log','SpotDataService',
    function($scope, $mdSidenav, $mdBottomSheet, $log, SpotDataService){

        $scope.appName = 'Spot My Dive';

        var allSpots = [ ];

        $scope.selected = null;

        $scope.spots = SpotDataService.getAllSpots();

        /**
         * Select the current spot
         * @param menuId
         */
        $scope.selectSpot  = function ( spot ) {
            $scope.selected = angular.isNumber(spot) ? $scope.spots[spot] : spot;
            $scope.toggleSidenav('left');
        };

        /**
         * Hide or Show the sideNav area
         * @param menuId
         */
        $scope.toggleSidenav = function ( name ) {
            $mdSidenav(name).toggle();
        };
    }]);
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

        /**
         * Show the bottom sheet
         */
        $scope.showActions = function ($event) {

            $mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                template: '<md-bottom-sheet class="md-list md-has-header">' +
                    '<md-subheader>Spot Actions</md-subheader>' +
                    '<md-list>' +
                    '<md-item ng-repeat="item in vm.items">' +
                    '<md-button ng-click="vm.performAction(item)">{{item.name}}</md-button>' +
                    '</md-item>' +
                    '</md-list>' +
                    '</md-bottom-sheet>',
                bindToController : true,
                controllerAs: "vm",
                controller: [ '$mdBottomSheet', AvatarSheetController],
                targetEvent: $event
            }).then(function(clickedItem) {
                    $log.debug( clickedItem.name + ' clicked!');
                });

            /**
             * Bottom Sheet controller for the Avatar Actions
             */
            function AvatarSheetController( $mdBottomSheet ) {
                this.items = [
                    { name: 'Share', icon: 'share' },
                    { name: 'Copy', icon: 'copy' },
                    { name: 'Impersonate', icon: 'impersonate' },
                    { name: 'Singalong', icon: 'singalong' },
                ];
                this.performAction = function(action) {
                    $mdBottomSheet.hide(action);
                };
            }
        };
    }]);
'use strict';

//var app = angular.module('SpotMyDiveApp', ['ngMaterial', 'spots']);
var app = angular.module('SpotMyDiveApp', ['ngMaterial', 'SpotMyDiveControllers', 'SpotMyDiveServices']);

app.config(function($mdThemingProvider) {

    // Use the 'brown' theme - override default 'blue' theme
    $mdThemingProvider.theme('default')
        .primaryColor('brown')
        .accentColor('brown');

});


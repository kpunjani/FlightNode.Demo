/* global $ */
'use strict';

/**
 * @ngdoc overview
 * @name flightNodedemoApp
 * @description
 * # flightNodedemoApp
 *
 * Main module of the application.
 */
angular
  .module('flightNodedemoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .directive('loading', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="loading"><img class="loadingImage" src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="64" height="64" /></div>',
        link: function (scope, element) {
            scope.$watch('loading', function (val) {
                if (val) {
                    $(element).show();
                }
                else {
                    $(element).hide();
                }
            });
        }
    }
});
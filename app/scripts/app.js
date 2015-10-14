/* global $ */
'use strict';

/**
 * @ngdoc overview
 * @name flightNodeDemo
 * @description
 * # flightNodeDemo
 *
 * Main module of the application.
 */
angular
  .module('flightNodeDemo', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.grid',
    'userMessage'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/users', {
          templateUrl: 'views/users/list.html',
          controller: 'UserController'
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
    };
});
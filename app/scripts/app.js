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
        controller: 'UserListController'
      })
      .when('/users/new', {
        templateUrl: 'views/users/create.html',
        controller: 'UserCreateController'
      })
      .when('/users/:userId', {
        templateUrl: 'views/users/edit.html',
        controller: 'UserEditController'
      })
      .otherwise({
        templateUrl: 'views/404.html'
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
  })
  .directive('alert', [function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/alert.html'
    };
  }]);
    
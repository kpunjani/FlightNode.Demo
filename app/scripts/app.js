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
    'userMessage',
    'roleProxy',
    'ui.bootstrap.datepicker'
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
      .when('/datacollection/workday', {
        templateUrl: 'views/dataCollection/workday.html',
        controller: 'WorkdayController'
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
  }])
  .directive('date', function () {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        ctrl.$validators.date = function (modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            // consider empty models to be valid
            return true;
          }

          if ((new Date(viewValue))) {
            // it is valid
            return true;
          }

          // it is invalid
          return false;
        };
      }
    };
  })
  .directive('time', function () {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        ctrl.$validators.time = function (modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            // consider empty models to be valid
            return true;
          }

          if ((new Date('2015-10-29 ' + viewValue))) {
            // it is valid
            return true;
          }

          // it is invalid
          return false;
        };
      }
    };
  });

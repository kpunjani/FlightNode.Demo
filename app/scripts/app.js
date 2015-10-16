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
  })
  .directive('alert', ['messenger', function (messenger) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="row"><div class="col-sm-8 col-sm-offset-2" id="login"><div class="alert alert-{{alert.type}}" ng-repeat="alert in alerts" type="{{alert.type}}" id="alert-{{$index}}">{{alert.msg}}<div class="pull-right hover-pointer" ng-click="messenger.closeAlert({{$index}})"><span class="glyphicon glyphicon-remove-circle"></span></span></div></div></div>', 
    };   
  }]);
    
/* global $ */
'use strict';

angular
  .module('flightNodeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.grid',
    'userMessage',
    'roleProxy',
    'ui.bootstrap.datepicker',
    'oauthRequest',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainController'
      })
      .when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'LoginController'
      })
      .when('/users', {
        templateUrl: 'app/views/users/list.html',
        controller: 'UserListController'
      })
      .when('/users/new', {
        templateUrl: 'app/views/users/create.html',
        controller: 'UserCreateController'
      })
      .when('/users/:userId', {
        templateUrl: 'app/views/users/edit.html',
        controller: 'UserEditController'
      })
      .when('/workday', {
        templateUrl: 'app/views/workday/create.html',
        controller: 'WorkdayController'
      })
      .when('/worktypes', {
        templateUrl: 'app/views/worktype/list.html',
        controller: 'WorktypeListController'
      })
      .when('/worktypes/new', {
        templateUrl: 'app/views/worktype/create.html',
        controller: 'WorktypeCreateController'
      })
      .when('/worktypes/:id', {
        templateUrl: 'app/views/worktype/edit.html',
        controller: 'WorktypeEditController'
      })
      .when('/locations', {
        templateUrl: 'app/views/location/list.html',
        controller: 'LocationListController'
      })
      .when('/locations/new', {
        templateUrl: 'app/views/location/create.html',
        controller: 'LocationCreateController'
      })
      .when('/locations/:id', {
        templateUrl: 'app/views/location/edit.html',
        controller: 'LocationEditController'
      })
      .when('/logout', {
        templateUrl: 'app/views/main.html',
        controller: 'LogoutController'
      })
      .otherwise({
        templateUrl: 'app/views/404.html'
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
      templateUrl: 'app/views/alert.html'
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

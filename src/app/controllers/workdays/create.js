'use strict';

flnd.workDayCreate = {
  configureDateField: function($scope) {
    $scope.workday = {};

    $scope.today = moment().format('MM/DD/YY');

    $scope.clear = function () {
        $scope.workday.workDate = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open = function () {
        $scope.status.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.workday.workDate = new Date(year, month, day);
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.format = 'shortDate';

    $scope.status = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
    [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    $scope.getDayClass = function (date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };
    return $scope;
  },

  loadLocations: function($scope, $log, messenger, authService) {
    authService.get('http://localhost:50323/api/v1/locations/simple')
        .then(function success(response) {

            $scope.data.locations = response.data;

        }, function error(response) {

            messenger.displayErrorResponse($scope, response);
        });
  },

  loadWorkTypes: function($scope, $log, messenger, authService) {
    authService.get('http://localhost:50323/api/v1/worktypes/simple')
        .then(function success(response) {

            $scope.data.worktypes = response.data;

        }, function error(response) {

            messenger.displayErrorResponse($scope, response);

        });
  },

  configureSubmit: function($scope, $log, messenger, authService) {

    $scope.submit = function() {
        $scope.loading = true;

        var msg = {
            locationId: $scope.workday.location,
            travelTimeHours: $scope.workday.travelHours,
            workDate: $scope.workday.workDate,
            workHours: $scope.workday.workHours,
            workTypeId: $scope.workday.workType,
            userId: authService.getUserId()
        };

        authService.post('http://localhost:50323/api/v1/worklogs', msg)
           .then(function success(){
                messenger.showSuccessMessage($scope, 'Saved');
           }, function error(response) {
                messenger.displayErrorResponse($scope, response);
           })
           .finally(function() {
                $scope.loading = false;
           });
    };

    return $scope;
  }
};

/**
 * @ngdoc function
 * @name flightNodeApp.controller:WorkdayCreateController
 * @description
 * # WorkdayController
 * Controller for the workday logging page.
 */
angular.module('flightNodeApp')
    .controller('WorkdayCreateController',
        ['$scope', '$location', '$http', '$log', 'messenger', 'authService',
            function ($scope, $location, $http, $log, messenger, authService) {
                $scope.loading = true;
                $scope.data = {};

                $scope = flnd.workDayCreate.configureDateField($scope);
                flnd.workDayCreate.loadWorkTypes($scope, $log, messenger, authService);
                flnd.workDayCreate.loadLocations($scope, $log, messenger, authService);

                $scope = flnd.workDayCreate.configureSubmit($scope, $log, messenger, authService);

                $scope.cancel = function() {
                    $location.path('/');
                };

                $scope.loading = false;
            }]);
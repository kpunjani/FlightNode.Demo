'use strict';

var configureDateField = function($scope) {
    $scope.workday = {}
    $scope.today = moment().format("MM/DD/YY");

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

    $scope.open = function ($event) {
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
};

var loadLocations = function($scope, $log, messenger, oauthRequest) {
    oauthRequest.get('http://localhost:50323/api/v1/locations/simple')
        .then(function success(response) {

            $scope.data.locations = response.data;

        }, function error(response) {

            $log.error(response);

            if (response.status === 401) {
                messenger.unauthorized($scope);
            } else {
                messenger.showErrorMessage($scope, { error: response });
            }
        });
}

var loadWorkTypes = function($scope, $log, messenger, oauthRequest) {
    oauthRequest.get('http://localhost:50323/api/v1/worktypes/simple')
        .then(function success(response) {

            $scope.data.worktypes = response.data;

        }, function error(response) {

            $log.error(response);

            if (response.status === 401) {
                messenger.unauthorized($scope);
            } else {
                messenger.showErrorMessage($scope, { error: response });
            }

        });
}

var configureSubmit = function($scope, $log, messenger, oauthRequest) {

    $scope.submit = function() {
        $scope.loading = true;

        var msg = {
            locationId: $scope.workday.location,
            travelTimeHours: $scope.workday.travelHours,
            workDate: $scope.workday.workDate,
            workHours: $scope.workday.workHours,
            workTypeId: $scope.workday.workType,
            userId: 1 // need to extract from token
        };

        oauthRequest.post('http://localhost:50323/api/v1/worklogs', msg)
           .then(function success(response){
                messenger.showSuccessMessage($scope, 'Saved');
                $scope.loading = false;
           }, function error(response) {
                switch (response.status) {
                    case 400:
                        var messages = [{ error: response.data.message }];
                        if (response.data.modelState) {
                            _.forIn(response.data.modelState, function (value, key) {
                                messages.push({ error: value.toString() });
                            });
                        }
                        messenger.showErrorMessage($scope, messages);
                        break;
                    case 401:
                        messenger.unauthorized($scope);
                        break;
                    default:
                        messenger.showErrorMessage($scope, { error: response });
                }
                $scope.loading = false;
           });
    }

    return $scope;
}

/**
 * @ngdoc function
 * @name flightNodeApp.controller:WorkdayCreateController
 * @description
 * # WorkdayController
 * Controller for the workday logging page.
 */
angular.module('flightNodeApp')
    .controller('WorkdayCreateController',
        ['$scope', '$location', '$http', '$log', 'messenger', 'oauthRequest',
            function ($scope, $location, $http, $log, messenger, oauthRequest) {
                $scope.loading = true;
                $scope.data = {};

                $scope = configureDateField($scope);
                loadLocations($scope, $log, messenger, oauthRequest);
                loadWorkTypes($scope, $log, messenger, oauthRequest);

                $scope = configureSubmit($scope, $log, messenger, oauthRequest);

                $scope.cancel = function() {
                    $location.path('/');
                };

                $scope.loading = false;
            }]);
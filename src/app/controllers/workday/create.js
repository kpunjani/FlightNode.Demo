'use strict';


/**
 * @ngdoc function
 * @name flightNodeApp.controller:WorkdayController
 * @description
 * # WorkdayController
 * Controller for the workday logging page.
 */
angular.module('flightNodeApp')
    .controller('WorkdayController',
        ['$scope', '$http', '$log', 'messenger',
            function ($scope, $http, $log, messenger) {
                $scope.loading = true;

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
                    $log.info('opening');
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

                $scope.loading = false;
            }]);
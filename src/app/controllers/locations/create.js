'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller.location:LocationCreateController
 * @description
 * # LocationCreateController
 * Controller for the create work type page.
 */
angular.module('flightNodeApp')
    .controller('LocationCreateController',
        ['$scope', '$http', '$log', '$location', 'messenger', 'authService',
            function ($scope, $http, $log, $location, messenger, authService) {

                // if (!(authService.isAdministrator() ||
                //    authService.isCoordinator())) {
                //  $log.warn('not authorized to access this path');
                //  $location.path('/');
                //  return;
                // }

                $scope.loading = true;

                $scope.cancel = function () {
                    $location.path('/locations');
                }

                $scope.submit = function () {
                    $scope.loading = true;

                    authService.post('http://localhost:50323/api/v1/locations', $scope.location)
                        .then(function success(response) {

                            messenger.showSuccessMessage($scope, 'Saved');

                        }, function error(response) {

                            messenger.displayErrorResponse($scope, response);

                        })
                        .finally(function() {
                            $scope.loading = false;
                        });
                };

                $scope.loading = false;
            }]);
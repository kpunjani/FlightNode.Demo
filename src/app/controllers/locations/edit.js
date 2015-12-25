'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller.location:LocationEditController
 * @description
 * # LocationEditController
 * Controller for the edit work type page.
 */
angular.module('flightNodeApp')
    .controller('LocationEditController',
        ['$scope', '$http', '$log', '$location', 'messenger', 'authService', '$routeParams',
            function ($scope, $http, $log, $location, messenger, authService, $routeParams) {

                if (!(authService.isAdministrator() ||
                      authService.isCoordinator())) {
                    $log.warn('not authorized to access this path');
                    $location.path('/');
                    return;
                }

                $scope.loading = true;

                var id = $routeParams.id;
                if (!isFinite(id)) {
                    // garbage input
                    return;
                }

                var url = 'http://localhost:50323/api/v1/locations/' +id;

                authService.get(url)
                    .then(function success(response) {
                        $scope.location = response.data;

                    }, function error(response) {

                         messenger.displayErrorResponse($scope, response);

                    });


                $scope.cancel = function () {
                    $location.path('/locations');
                }

                $scope.submit = function () {
                    $scope.loading = true;

                    authService.put(url, $scope.location)
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
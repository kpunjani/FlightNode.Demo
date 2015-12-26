'use strict';

flnd.locationCreate = {
    configureSubmit: function($scope, config, messenger, authService) {
        return function() {
            $scope.loading = true;

            authService.post(config.locations, $scope.location)
                .then(function success() {

                    messenger.showSuccessMessage($scope, 'Saved');

                }, function error(response) {

                    messenger.displayErrorResponse($scope, response);

                })
                .finally(function() {
                    $scope.loading = false;
                });
        };
    }
};

/**
 * @ngdoc function
 * @name flightNodeApp.controller.location:LocationCreateController
 * @description
 * # LocationCreateController
 * Controller for the create work type page.
 */
angular.module('flightNodeApp')
    .controller('LocationCreateController',
        ['$scope', '$http', '$log', '$location', 'messenger', 'authService', 'config',
            function ($scope, $http, $log, $location, messenger, authService, config) {

                if (!(authService.isAdministrator() ||
                   authService.isCoordinator())) {
                 $log.warn('not authorized to access this path');
                 $location.path('/');
                 return;
                }

                $scope.loading = true;

                $scope.cancel = function () {
                    $location.path('/locations');
                };

                $scope.submit = flnd.locationCreate.configureSubmit($scope, config, messenger, authService);

                $scope.loading = false;
            }]);
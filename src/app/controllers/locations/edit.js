'use strict';

flnd.locationEdit = {
    retrieveRecord: function(url, $scope, messenger, authService) {

        authService.get(url)
            .then(function success(response) {
                $scope.location = response.data;

            }, function error(response) {

                 messenger.displayErrorResponse($scope, response);

            });
    },

    configureSubmit: function(url, $scope, messenger, authService){
        return function() {
            $scope.loading = true;

            authService.put(url, $scope.location)
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
 * @name flightNodeApp.controller.location:LocationEditController
 * @description
 * # LocationEditController
 * Controller for the edit work type page.
 */
angular.module('flightNodeApp')
    .controller('LocationEditController',
        ['$scope', '$http', '$log', '$location', 'messenger', 'authService', '$routeParams', 'config',
            function ($scope, $http, $log, $location, messenger, authService, $routeParams, config) {

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

                var url = config.locations + id;

                flnd.locationEdit.retrieveRecord(url, $scope, messenger, authService);

                $scope.cancel = function () {
                    $location.path('/locations');
                };

                $scope.submit = flnd.locationEdit.configureSubmit(url, $scope, messenger, authService);

                $scope.loading = false;
            }]);
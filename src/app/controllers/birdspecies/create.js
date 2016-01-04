'use strict';

flnd.birdSpeciesCreate = {
    configureSubmit: function(config, $scope, messenger, authService, $uibModalInstance) {
        return function () {
            $scope.loading = true;

            authService.post(config.birdspecies, $scope.birdspecies)
                .then(function success() {

                $uibModalInstance.close();
                }, function error(response) {
                    messenger.displayErrorResponse($scope, response);
                })
                .finally(function(){
                    $scope.loading = false;
                });
        };
    }
};

/**
 * @ngdoc function
 * @name flightNodeApp.controller.birdspecies:BirdSpeciesCreateController
 * @description
 * # BirdSpeciesCreateController
 * Controller for the create bird species page.
 */
angular.module('flightNodeApp')
    .controller('BirdSpeciesCreateController',
        ['$scope', '$http', '$log', '$location', 'messenger', 'authService', 'config', '$uibModalInstance',
            function ($scope, $http, $log, $location, messenger, authService, config, $uibModalInstance) {

                if (!(authService.isAdministrator() ||
                      authService.isCoordinator())) {
                    $log.warn('not authorized to access this path');
                    $location.path('/');
                    return;
                }

                $scope.loading = true;

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.submit = flnd.birdSpeciesCreate.configureSubmit(config, $scope, messenger, authService, $uibModalInstance);

                $scope.loading = false;
            }]);
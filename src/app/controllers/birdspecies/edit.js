'use strict';

flnd.birdSpeciesEdit = {
    retrieveRecord: function(id, config, $scope, messenger, authService) {
        var url =  config.birdspecies + id;

        authService.get(url)
            .then(function success(response) {
                $scope.birdspecies = response.data;

            }, function error(response) {
                messenger.displayErrorResponse($scope, response);
            });
    },

    configureSubmit: function(id, config, $scope, messenger, authService, $uibModalInstance) {
        return function () {
            $scope.loading = true;

            var url =  config.birdspecies + id;
            authService.put(url, $scope.birdspecies)
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
 * @name flightNodeApp.controller.worktype:BirdSpeciesEditController
 * @description
 * # BirdSpeciesEditController
 * Controller for the edit bird species page.
 */
angular.module('flightNodeApp')
    .controller('BirdSpeciesEditController',
        ['$scope', '$http', '$log', '$location', 'messenger', 'authService', '$routeParams', 'config', '$uibModalInstance', 'id',
            function ($scope, $http, $log, $location, messenger, authService, $routeParams, config, $uibModalInstance, id) {

                if (!(authService.isAdministrator() ||
                      authService.isCoordinator())) {
                    $log.warn('not authorized to access this path');
                    $location.path('/');
                    return;
                }

                $scope.loading = true;

                if (!isFinite(id)) {
                    // garbage input
                    return;
                }

                flnd.birdSpeciesEdit.retrieveRecord(id, config, $scope, messenger, authService);

                $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
                };

                $scope.submit = flnd.birdSpeciesEdit.configureSubmit(id, config, $scope, messenger, authService, $uibModalInstance);

                $scope.loading = false;
            }]);
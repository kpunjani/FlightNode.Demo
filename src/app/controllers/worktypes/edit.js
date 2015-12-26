'use strict';

flnd.workTypeEdit = {
    retrieveRecord: function(id, config, $scope, messenger, authService) {
        var url =  config.workTypes +id;

        authService.get(url)
            .then(function success(response) {
                $scope.worktype = response.data;

            }, function error(response) {
                messenger.displayErrorResponse($scope, response);
            });
    },
    configureSubmit: function(id, config, $scope, messenger, authService) {
        return function () {
            $scope.loading = true;

            var url =  config.workTypes +id;
            authService.put(url, $scope.worktype)
                .then(function success() {

                    messenger.showSuccessMessage($scope, 'Saved');
                    $scope.loading = false;

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
 * @name flightNodeApp.controller.worktype:WorktypeEditController
 * @description
 * # WorktypeEditController
 * Controller for the edit work type page.
 */
angular.module('flightNodeApp')
    .controller('WorktypeEditController',
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

                flnd.workTypeEdit.retrieveRecord(id, config, $scope, messenger, authService);

                $scope.cancel = function () {
                    $location.path('/worktypes');
                };

                $scope.submit = flnd.workTypeEdit.configureSubmit(id, config, $scope, messenger, authService);

                $scope.loading = false;
            }]);
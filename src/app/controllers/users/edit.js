'use strict';

flnd.userEdit = {
    retrieveUser: function(url, $scope, messenger, authService) {
        authService.get(url)
            .then(function success(response) {

                $scope.user = response.data;

            }, function error(response) {

                messenger.displayErrorResponse($scope, response);
            })
            .finally(function() {
                $scope.loading = false;
            });
        },

    configureSubmit: function(url, $scope, messenger, authService, $uibModalInstance) {
      return function() {
        $scope.loading = true;

        authService.put(url, $scope.user)
            .then(function success() {

                $uibModalInstance.close();

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
 * @name flightNodeApp.controller:UserEditController
 * @description
 * # UserEditController
 * Controller for the edit user page.
 */
angular.module('flightNodeApp')
    .controller('UserEditController',
        ['$scope', '$http', '$log', '$location', '$routeParams', 'messenger', 'authService', 'config', '$uibModalInstance', 'id',
        function ($scope, $http, $log, $location, $routeParams, messenger, authService, config, $uibModalInstance, id) {

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

            var url = config.locations + id;

            flnd.userEdit.retrieveUser(url, $scope, messenger, authService);

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.submit = flnd.userEdit.configureSubmit(url, $scope, messenger, authService, $uibModalInstance);

            $scope.loading = false;
        }]);
'use strict';

flnd.userEdit = {
    retrieveRoles: function($scope, roleProxy, $log, messenger) {
        $scope.data = {};

        roleProxy.getAll( function (error, response) {
            if (error) {
                $log.error('Failed to retrieve roles: ', JSON.stringify(error));
            } else {
                if (response.status === 200) {
                    $scope.data.roles = response.data;
                } else {
                    messenger.showErrorMessage($scope, 'Unable to load available roles. Please try reloading this page or returning again soon. We apologize for the inconvenience.');
                    $log.info('Roles: ', response);
                }
            }
        });
    },
    retrieveUser: function(url, $scope, messenger, authService, roleProxy) {
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
        ['$scope', '$http', '$log', '$location', '$routeParams', 'messenger', 'authService', 'config', '$uibModalInstance', 'id', 'roleProxy',
        function ($scope, $http, $log, $location, $routeParams, messenger, authService, config, $uibModalInstance, id, roleProxy) {

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

            flnd.userEdit.retrieveRoles($scope, roleProxy, $log, messenger);

            var url = config.users + id;

            flnd.userEdit.retrieveUser(url, $scope, messenger, authService, roleProxy);

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.submit = flnd.userEdit.configureSubmit(url, $scope, messenger, authService, $uibModalInstance);

            $scope.loading = false;
        }]);
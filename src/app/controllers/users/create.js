'use strict';

flnd.userCreate = {
  configureSubmit: function(config, $scope, messenger, authService, $uibModalInstance) {
    return function() {
        $scope.loading = true;

        authService.post(config.users, $scope.user)
            .then(function success() {

                $uibModalInstance.close();

            }, function error(response) {

                messenger.displayErrorResponse($scope, response);

            })
            .finally(function() {
                $scope.loading = false;
            });

        $scope.loading = false;
    };
  }
};

/**
 * @ngdoc function
 * @name flightNodeApp.controller:UserCreateController
 * @description
 * # UserCreateController
 * Controller for the create user page.
 */
angular.module('flightNodeApp')
    .controller('UserCreateController',
        ['$scope', '$http', '$log', '$location', 'messenger', 'roleProxy', 'authService', 'config', '$uibModalInstance',
            function ($scope, $http, $log, $location, messenger, roleProxy, authService, config, $uibModalInstance) {


                if (!(authService.isAdministrator() ||
                      authService.isCoordinator())) {
                    $log.warn('not authorized to access this path');
                    $location.path('/');
                    return;
                }

                $scope.loading = true;
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

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.submit = flnd.userCreate.configureSubmit(config, $scope, messenger, authService, $uibModalInstance);

                $scope.loading = false;
        }]);
'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller:UserCreateController
 * @description
 * # UserCreateController
 * Controller for the create user page.
 */
angular.module('flightNodeApp')
    .controller('UserCreateController',
        ['$scope', '$log', 'messenger', 'roleProxy', 'authService', '$uibModalInstance', 'userProxy',
            function ($scope, $log, messenger, roleProxy, authService, $uibModalInstance, userProxy) {


                if (!(authService.isAdministrator() ||
                      authService.isCoordinator())) {
                    $log.warn('not authorized to access this path');
                    $uibModalInstance.dismiss('cancel');
                    return;
                }

                $scope.loading = true;
                $scope.data = {};
                $scope.showRoles = true;


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

                $scope.submit = userProxy.insert($scope, $uibModalInstance);

                $scope.loading = false;
        }]);
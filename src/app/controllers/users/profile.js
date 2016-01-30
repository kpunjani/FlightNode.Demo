'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller:UserProfileController
 * @description
 * # UserProfileController
 * Controller for the create user page.
 */
angular.module('flightNodeApp')
    .controller('UserProfileController', ['$scope', '$log', 'messenger', 'roleProxy', 'authService', 'userProxy',
        function($scope, $log, messenger, roleProxy, authService, userProxy) {


            if (!(authService.isAdministrator() ||
                authService.isCoordinator())) {
                $log.warn('not authorized to access this path');
                $location.path('/');
                return;
            }

            $scope.loading = true;
            $scope.data = {};
            $scope.showRoles = false;

            var id = authService.getUserId();

            userProxy.findOne($scope, id)();

            roleProxy.getAll(function(error, response) {
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

            $scope.cancel = function() {
                $location.path('/');
            };

            $scope.submit = userProxy.profile($scope, id);

            $scope.loading = false;
        }
    ]);
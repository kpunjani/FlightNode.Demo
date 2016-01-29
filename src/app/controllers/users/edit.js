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
        ['$scope', '$log', '$location', 'messenger', 'authService', '$uibModalInstance', 'id', 'roleProxy', 'userProxy',
        function ($scope, $log, $location, messenger, authService, $uibModalInstance, id, roleProxy, userProxy) {

            if (!(authService.isAdministrator() ||
                  authService.isCoordinator())) {
                $log.warn('not authorized to access this path');
                $location.path('/');
                return;
            }

            $scope.loading = true;
            $scope.showRoles = true;

            if (!isFinite(id)) {
                // garbage input
                return;
            }

            flnd.userEdit.retrieveRoles($scope, roleProxy, $log, messenger);

            userProxy.findOne($scope, id)();

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.submit = userProxy.update($scope, $uibModalInstance, id);

            $scope.loading = false;
        }]);
'use strict';

flnd.userEdit = {
    retrieveUser: function(config, $scope, userId, messenger, authService) {
        authService.get(config.users + userId)
            .then(function success(response) {

                $scope.user = response.data;

            }, function error(response) {

                messenger.displayErrorResponse($scope, response);
            })
            .finally(function() {
                $scope.loading = false;
            });
        },

    configureSubmit: function(config, $scope, userId, messenger, authService) {
      return function() {
        $scope.loading = true;

        authService.put(config.users + userId, $scope.user)
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
 * @name flightNodeApp.controller:UserEditController
 * @description
 * # UserEditController
 * Controller for the edit user page.
 */
angular.module('flightNodeApp')
    .controller('UserEditController',
        ['$scope', '$http', '$log', '$location', '$routeParams', 'messenger', 'authService', 'config',
        function ($scope, $http, $log, $location, $routeParams, messenger, authService, config) {

            if (!(authService.isAdministrator() ||
                  authService.isCoordinator())) {
                $log.warn('not authorized to access this path');
                $location.path('/');
                return;
            }

            $scope.loading = true;

            var userId = $routeParams.userId;
            if (!isFinite(userId)) {
                // garbage input
                return;
            }

            $scope.action = 'Edit';

            flnd.userEdit.retrieveUser(config, $scope, userId, messenger, authService);

            $scope.cancel = function () {
                $location.path('/users');
            };

            $scope.submit = flnd.userEdit.configureSubmit(config, $scope, userId, messenger, authService);

        }]);
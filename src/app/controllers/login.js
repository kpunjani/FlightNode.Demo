'use strict';

flnd.login = {
    configureSubmit: function(config, $scope, messenger, $http, authService, navigationService, $log) {
      return function () {

         if ($scope.loginForm.$valid) {
            $scope.loading = true;

            var data = {
                grant_type: 'password', // jshint ignore:line
                userName: $scope.userName,
                password: $scope.password
            };

            $http({
                // TODO: move this string into a config file
                url: config.token,
                method: 'POST',
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                },
                data: data,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            })
                .then(function success(response) {
                    messenger.showSuccessMessage($scope, 'Login successful.');

                    // response.data has the the access_token and expires_in (seconds).
                    // Need to record the actual expiration timestamp, not just the duration.
                    var expiresAt = moment().add(response.data.expires_in, 's').toDate();
                    authService.setToken(response.data.access_token, expiresAt);

                    // force re-query for navigation tree
                    navigationService.resetTree();

                }, function error(response) {
                    $log.error(response);
                    messenger.displayErrorResponse($scope, response.status.toString() + ': ' + response.statusText);
                })
                .finally(function () {
                    $scope.loading = false;
                });
        } else {
            messenger.showErrorMessage($scope, { error: 'Invalid fields.'});
        }
      };
    }
};

/**
 * @ngdoc function
 * @name flightNodeApp.controller:LoginController
 * @description
 * # LoginController
 * Controller for the login page
 */
angular.module('flightNodeApp')
    .controller('LoginController',
        ['$scope', '$http', '$log', 'messenger', 'authService', 'navigationService', 'config',
        function ($scope, $http, $log, messenger, authService, navigationService, config) {

        $scope.loading = true;

        $scope.submit = flnd.login.configureSubmit(config, $scope, messenger, $http, authService, navigationService, $log);

        $scope.loading = false;

    }]);
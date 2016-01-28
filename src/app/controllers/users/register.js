'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller:UserRegisterController
 * @description
 * # UserRegisterController
 * Controller for the Register user page.
 */
angular.module('flightNodeApp')
    .controller('UserRegisterController', ['$scope', '$log', 'messenger', 'roleProxy', 'authService', '$location', 'userProxy',
        function($scope, $log, messenger, roleProxy, authService, $location, userProxy) {

            $scope.loading = true;

            $scope.data = {
                roles : [ { name: 'Reporter', description: 'Reporter' }]
            };
            $scope.user = {
                roles: [ 'Reporter' ]
            };

            $scope.cancel = function() {
                $location.path('/');
            };

            $scope.submit = userProxy.register($scope);

            $scope.loading = false;
        }
    ]);
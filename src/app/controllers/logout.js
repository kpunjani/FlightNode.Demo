'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller:LoginController
 * @description
 * # LoginController
 * Controller that  handles user logout
 */
angular.module('flightNodeApp')
    .controller('LogoutController',
        ['$log', 'authService', '$location', 'navigationService',
        function ($log, authService, $location, navigationService) {
            authService.clearToken();
            navigationService.resetTree();

            $location.path('/');

        }]
    );
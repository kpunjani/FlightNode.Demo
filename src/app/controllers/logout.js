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
        ['$log', 'authService', '$location', 'navigationService', 'config',
        function ($log, authService, $location, navigationService, config) {
            authService.clearToken();
            navigationService.resetTree();

            authService.delete(config.token)
            .then(function success(response){
                if (response) {
                    $log.info(response);
                }

                $location.path('/');

            }, function error(err){
                if (err) {
                    $log.error(err);
                }

                $location.path('/');
            });
        }]
    );
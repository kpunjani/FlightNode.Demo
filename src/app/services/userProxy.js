'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.Services:userProxy
 * @description
 * # userProxy
 * Controller for the create user page.
 */
angular.module('flightNodeApp')
    .factory('userProxy', ['$http', '$log', 'authService', 'config', 'messenger', '$location',
        function($http, $log, authService, config, messenger, $location) {
            return {
                insert: function($scope, $uibModalInstance) {
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
                    };
                },

                register: function($scope) {
                    return function() {
                        $log.info('submit registration');
                        $scope.loading = true;

                        authService.post(config.usersRegister, $scope.user)
                            .then(function success() {

                                messenger.showSuccessMessage('Your new account has been created with activation pending. You will receive an e-mail once your account has been approved.');

                            }, function error(response) {

                                messenger.displayErrorResponse($scope, response);

                            })
                            .finally(function() {
                                $scope.loading = false;
                            });
                    };
                },

                update: function($scope, $uibModalInstance, id) {
                    return function() {

                        $scope.loading = true;
                        var url = config.users + id;

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
                },

                profile: function($scope, id) {
                    return function() {

                        $scope.loading = true;
                        var url = config.users + id + "/profile";

                        authService.put(url, $scope.user)
                            .then(function success() {

                                messenger.showSuccessMessage('Your account profile has been saved.');

                            }, function error(response) {

                                messenger.displayErrorResponse($scope, response);
                            })
                            .finally(function() {
                                $scope.loading = false;
                            });
                    };
                },

                findOne: function($scope, id) {
                    return function() {
                        var url = config.users + id;

                        authService.get(url)
                            .then(function success(response) {

                                $scope.user = response.data;

                            }, function error(response) {

                                messenger.displayErrorResponse($scope, response);
                            });
                    };
                }
            };
        }
    ]);
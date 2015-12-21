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
		['$scope', '$http', '$log', '$location', 'messenger', 'roleProxy', 'authService',
			function ($scope, $http, $log, $location, messenger, roleProxy, authService) {


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
						$log.error('Failed to retrieve roles: ' + error);
					} else {
						if (response.status === 200) {
							$scope.data.roles = response.data;
						} else {
							messenger.showErrorMessage($scope, 'Unable to load available roles. Please try reloading this page or returning again soon. We apologize for the inconvenience.');
							$log.info('Roles: ', response);
						}
					}
				})

				$scope.cancel = function () {
					$location.path('/users');
				}

				$scope.submit = function () {
					$scope.loading = true;

					authService.post('http://localhost:50323/api/v1/user/', $scope.user)
							.then(function success(response) {
								messenger.showSuccessMessage($scope, 'Saved');
								$scope.loading = false;
							}, function error(response) {
								// This is all duplicated from the Edit. Should certainly
								// be able to refactor this, but still in the learning phase
								// and not ready for that yet...

								switch (response.status) {
									case 400:
										var messages = [{ error: response.data.message }];
										if (response.data.modelState) {
											_.forIn(response.data.modelState, function (value, key) {
												messages.push({ error: value.toString() });
											});
										}
										messenger.showErrorMessage($scope, messages);
										break;
									case 401:
										messenger.unauthorized($scope);
										break;
									default:
										messenger.showErrorMessage($scope, { error: response });
								}
								$scope.loading = false;
							});

				$scope.loading = false;
			};

			$scope.loading = false;
		}]);
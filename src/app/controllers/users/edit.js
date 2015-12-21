'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller:UserEditController
 * @description
 * # UserEditController
 * Controller for the edit user page.
 */
angular.module('flightNodeApp')
	.controller('UserEditController',
		['$scope', '$http', '$log', '$location', '$routeParams', 'messenger', 'authService',
		function ($scope, $http, $log, $location, $routeParams, messenger, authService) {

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

			authService.get('http://localhost:50323/api/v1/user/' + userId)
						.then(function success(response) {

							$scope.user = response.data;
							$scope.loading = false;

						}, function error(response) {

							$log.error(response);

							if (response.status === 401) {
								messenger.unauthorized($scope);
							} else {
								messenger.showErrorMessage($scope, { error: response });
							}

							$scope.loading = false;
						});

			$scope.cancel = function () {
				$location.path('/users');
			}

			$scope.submit = function () {
				$scope.loading = true;

				authService.put('http://localhost:50323/api/v1/user/' + userId, $scope.user)
						.then(function success(response) {
							messenger.showSuccessMessage($scope, 'Saved');
							$scope.loading = false;
						}, function error(response) {
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
			};


		}]);
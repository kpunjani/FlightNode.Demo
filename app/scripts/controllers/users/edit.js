'use strict';

/**
 * @ngdoc function
 * @name flightNodeDemo.controller:UserEditController
 * @description
 * # UserEditController
 * Controller for the edit user page.
 */
angular.module('flightNodeDemo')
	.controller('UserEditController', ['$scope', '$http', '$log', '$location', '$routeParams', 'messenger',
		function ($scope, $http, $log, $location, $routeParams, messenger) {

			$scope.loading = true;

			var userId = $routeParams.userId;
			if (!isFinite(userId)) {
				// garbage input
				return;
			}

			$scope.action = 'Edit';

			var jwt = JSON.parse(localStorage.getItem('jwt'));

			if (jwt) {
				// TODO: validate that the user administration claim is present.
				if (moment() < moment(jwt.expiresAt)) {

					$http({
						url: 'http://localhost:50323/api/v1/user/' + userId,
						method: 'GET',
						headers: {
							Authorization: 'bearer ' + jwt.access_token
						}
					})
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
				} else {
					messenger.unauthorized($scope);
				}
			} else {
				messenger.unauthorized($scope);
			}


			$scope.cancel = function () {
				$location.path('/users');
			}

			$scope.submit = function () {
				$scope.loading = true;
				var jwt = JSON.parse(localStorage.getItem('jwt'));


				if (jwt) {
			
					// TODO: validate that the user administration claim is present.
					if (moment() < moment(jwt.expiresAt)) {
						$http({
							url: 'http://localhost:50323/api/v1/user/' + userId,
							method: 'PUT',
							data: $scope.user,
							headers: {
								Authorization: 'bearer ' + jwt.access_token
							}
						}).then(function success(response) {
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
					} else {
						$log.info('Token expired');
						messenger.unauthorized($scope);
					}
				} else {
					messenger.unauthorized($scope);
				}
			};


		}]);
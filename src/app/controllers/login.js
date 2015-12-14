'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller:LoginController
 * @description
 * # LoginController
 * Controller for the login page
 */
angular.module('flightNodeApp')
	.controller('LoginController',
		['$scope', '$http', '$log', 'messenger', 'oauthRequest',
		function ($scope, $http, $log, messenger, oauthRequest) {

		$scope.response = 'doesn\'t work yet.';

		$scope.loading = true;

		$scope.submit = function () {

				 if ($scope.loginForm.$valid) {
					$scope.loading = true;

					var data = {
						grant_type: 'password', // jshint ignore:line
						userName: $scope.userName,
						password: $scope.password
					};

					$http({
						// TODO: move this string into a config file
						url: 'http://localhost:50323/oauth/token',
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
							oauthRequest.setToken(response.data.access_token, expiresAt);

						}, function error(response) {

							var data = null;
							if (response.status === -1) {
								data = { error: 'Back-end service is currently offline.' };
							} else {
								$log.error('Status code: ', response.status);
								data = { error: response.data.error_description };
							}

							messenger.showErrorMessage($scope, data);
						})
						.finally(function () {
							$scope.loading = false;
						});
				} else {
					messenger.showErrorMessage($scope, { error: 'Invalid fields.'});
				}
			};


		$scope.loading = false;

	}]);
'use strict';

/**
 * @ngdoc function
 * @name flightNodeDemo.controller:LoginController
 * @description
 * # LoginController
 * Controller for the login page
 */
angular.module('flightNodeDemo')
	.controller('UserController', function ($scope, $http, $log) {

		$scope.loading = true;

		$scope.userList = {};

		var jwt = localStorage.getItem('jwt');

		if (jwt) {
			// TODO: validate that the user administration claim is present.
			// TODO: validate the expiration date.
			var access_token = (JSON.parse(jwt)).data.access_token;
			
			$http({
				url: 'http://localhost:50323/api/v1/user',
				method: 'GET',
				headers: {
					Authorization: 'bearer ' + access_token
				}
			})
				.then(function success(response) {

					$scope.userList.data = response.data;

				}, function error(response) {

					$log.error(response);

					if (response.status === 401) {
						$scope.unauthorized();
					} else {
						$scope.showErrorMessage({ error: response });
					}
				});

		} else {
			$scope.unauthorized();
		}

		$scope.unauthorized = function () {
			$scope.showErrorMessage({ error: 'Must be logged in to use this page.'});
		};

		// TODO: move these functions somewhere so 
		// that they can be re-used
		$scope.showErrorMessage = function (data) {
			var msg = data.error;

			if (data.error_description) {
				msg += ': ' + data.error_description;
			}

			$scope.alerts = [
				{ type: 'danger', msg: msg }
			];
		};

		$scope.showSuccessMessage = function (msg) {
			$scope.alerts = [
				{ type: 'success', msg: msg }
			];
		};

		$scope.loading = false;

	});
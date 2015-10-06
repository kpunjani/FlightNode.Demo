'use strict';

/**
 * @ngdoc function
 * @name flightNodedemoApp.controller:LoginController
 * @description
 * # LoginController
 * Controller for the login page
 */
angular.module('flightNodedemoApp')
	.controller('LoginController', function ($scope, $http, $log) {

		$scope.response = 'doesn\'t work yet.';

		$scope.loading = true;

		$scope.loginForm = {
			submit: function () {

				$scope.loading = true;

				$scope.loginForm.data.grant_type = 'password'; // jshint ignore:line

				$http({
					url: 'http://localhost:50323/oauth/token',
					method: 'POST',
					transformRequest: function (obj) {
						var str = [];
						for (var p in obj) {
							str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
						}
						return str.join("&");
					},
					data: $scope.loginForm.data,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
				})
					.success(function (data) {
						$scope.showSuccessMessage('Login successful.');
						localStorage.setItem('jwt', JSON.stringify(data || {}));
					})
					.error(function (data, status) {
						$log.error('Status code: ', status);
						$log.error('Data: ', data);
						
						data = data || { error: 'Status Code: ' + status};
						
						$scope.showErrorMessage(data);
					})
					.finally(function () {
						$scope.loading = false;
					});
			},
			data: {}
		};

		$scope.showErrorMessage = function (data) {
			var msg = data.error;
			
			if (data.error_description) {
				msg += ": " + data.error_description;
			}
			
			$scope.alerts = [
				{ type: 'danger', msg: msg}
			];
		};

		$scope.showSuccessMessage = function (msg) {
			$scope.alerts = [
				{ type: 'success', msg: msg }
			];
		};


		$scope.loading = false;

	});
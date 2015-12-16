'use strict';

angular.module('userMessage', [])
	.factory('messenger', function () {
		return {
			showErrorMessage: function ($scope, data) {

				if (!Array.isArray(data)) {
					data = [data];
				}

				$scope.alerts = [];

				_.forEach(data, function (d) {
					var msg = d;
					if (d.error) {
						msg = d.error;
					}

					if (d.error_description) {
						msg += ': ' + d.error_description;
					}

					$scope.alerts.push({ type: 'danger', msg: msg });
				});

			},

			showSuccessMessage: function ($scope, msg) {
				$scope.alerts = [
					{ type: 'success', msg: msg }
				];
			},

			unauthorized: function ($scope) {

				$scope.alerts = [
					{ type: 'warning', msg: 'Must be logged in to use this page.' }
				];
			}
		};
	});
'use strict';

angular.module('userMessage', [])
	.factory('messenger', function () {
		return {
			showErrorMessage: function ($scope, data) {
				var msg = data;
				if (data.error) {
					msg = data.error;
				}

				if (data.error_description) {
					msg += ': ' + data.error_description;
				}

				$scope.alerts = [
					{ type: 'danger', msg: msg }
				];
			},

			showSuccessMessage: function ($scope, msg) {
				$scope.alerts = [
					{ type: 'success', msg: msg }
				];
			}
		};
	});
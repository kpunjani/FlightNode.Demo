'use strict';

angular.module('roleProxy', [])
	.factory('roleProxy',
		['$http', 'authService', 'config', '$log',
		function ($http, authService, config, $log) {
		return {

			getAll: function (done) {

				authService.get(config.roles)
					.then(function success(response) {
						done(null, response);
					}, function error(response) {
						done(response);
					});
			}

		};
	}]);
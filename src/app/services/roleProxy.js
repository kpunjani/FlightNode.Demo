'use strict';

angular.module('roleProxy', [])
	.factory('roleProxy',
		['$http', 'authService', 'config',
		function ($http, authService, config) {
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
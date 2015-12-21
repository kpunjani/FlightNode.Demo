'use strict';

angular.module('roleProxy', [])
	.factory('roleProxy', 
		['$http', 'authService', 
		function ($http, authService) {
		return {

			getAll: function (done) {
				authService.get('http://localhost:50323/api/v1/role')
					.then(function success(response) {
						done(null, response);
					}, function error(response) {
						done(response);
					});
			}

		};
	}]);
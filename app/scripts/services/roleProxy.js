'use strict';

angular.module('roleProxy', [])
	.factory('roleProxy', function ($http) {
		return {

			getAll: function (access_token, done) {

				$http({
					url: 'http://localhost:50323/api/v1/role',
					method: 'GET',
					headers: {
						Authorization: 'bearer ' + access_token
					}
				}).then(function success(response) {
					done(null, response);
				}, function error(response) {
					done(response);
				});				
			}

		};
	});
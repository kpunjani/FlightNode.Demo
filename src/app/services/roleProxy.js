'use strict';

angular.module('roleProxy', [])
	.factory('roleProxy', 
		['$http', 'oauthRequest', 
		function ($http, oauthRequest) {
		return {

			getAll: function (done) {
				oauthRequest.get('http://localhost:50323/api/v1/role')
					.then(function success(response) {
						done(null, response);
					}, function error(response) {
						done(response);
					});
			}

		};
	}]);
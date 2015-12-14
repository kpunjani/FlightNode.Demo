'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller:LoginController
 * @description
 * # LoginController
 * Controller that  handles user logout
 */
angular.module('flightNodeApp')
	.controller('LogoutController',
		['$log', 'oauthRequest', '$location',
		function ($log, oauthRequest, $location) {
			oauthRequest.delete('http://localhost:50323/oauth/token')
			.then(function success(response){
				if (response) {
					$log.info(response);
				}

				oauthRequest.clearToken();

				$location.path('/');

			}, function error(err){
				if (err) {
					$log.error(err);
				}

				oauthRequest.clearToken();

				$location.path('/');
			});
		}]
	);
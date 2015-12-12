'use strict';


/**
 * @ngdoc function
 * @name flightNodeDemo.services:oauthRequest
 * @description
 * # oauthRequest
 * Service for making HTTP request using a JSON Web Token (jwt).
 */
angular.module('oauthRequest', [])
	.factory('oauthRequest', ['$cookies', '$http', function ($cookies, $http) {

		var TOKEN_KEY = 'org.flightnode.jwt';

		return {
			getToken: function() {
				return $cookies.get(TOKEN_KEY);
			},

			setToken: function(accessToken, expiresAt) {
				$cookies.put(TOKEN_KEY, accessToken, { expires: expiresAt});
			},

			clearToken: function() {
				$cookies.remove(TOKEN_KEY);
			},

			_request: function(url, verb) {
				var $this = this;

				var token = $this.getToken();

				if (!token) {
					return {
						then: function(success, error) {
							error({status: 401});
						}
					};
				}

				return $http({
					url: url,
					method: verb,
					headers: {
						Authorization: 'bearer ' + $this.getToken()
					}
				});

			},

			get: function(url) {
				var $this = this;

				return $this._request(url, 'GET');
			},

			delete: function(url, body) {
				var $this = this;

				return $this._request(url, 'DELETE');
			}

		};
	}]);
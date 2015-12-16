'use strict';


/**
 * @ngdoc function
 * @name flightNodeApp.services:oauthRequest
 * @description
 * # oauthRequest
 * Service for making HTTP request using a JSON Web Token (jwt).
 */
angular.module('oauthRequest', [])
	.factory('oauthRequest',
		['$cookies', '$http', 'jwtHelper', '$log',
		 function ($cookies, $http, jwtHelper, $log) {

		var TOKEN_KEY = 'org.flightnode.jwt';
		var roles;

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

			_getRoles: function() {
			    var $this = this;

			    if (!$this.roles) {
			    	$this.roles = jwtHelper.decodeToken($this.getToken()).role || '';
					if (!_.isArray(roles)) {
						$this.roles = [ $this.roles ];
					}
			    }

			    return $this.roles;
			},

			_request: function(url, verb, data) {
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
					data: data,
					headers: {
						Authorization: 'bearer ' + $this.getToken()
					}
				});

			},

			get: function(url) {
				var $this = this;

				return $this._request(url, 'GET');
			},

			post: function(url, data) {
				var $this = this;

				return $this._request(url, 'POST', data);
			},

			put: function(url, data) {
				var $this = this;

				return $this._request(url, 'PUT', data);
			},

			delete: function(url, data) {
				var $this = this;

				return $this._request(url, 'DELETE');
			},

			isAdministrator: function() {
				var $this = this;
$log.info('Roles: ', $this._getRoles());
				return _.includes($this._getRoles(), 'Administrator');
			},

			isCoordinator: function() {
				var $this = this;

				return _.includes($this._getRoles(), 'Coordinator');
			}

		};
	}]);
'use strict';

/**
 * @ngdoc function
 * @name flightNodeDemo.controller:UserListController
 * @description
 * # UserListController
 * Controller for the user list page.
 */
angular.module('flightNodeDemo')
	.controller('UserListController',
	 ['$scope', '$http', '$log', 'messenger', '$location', 'oauthRequest',
		function ($scope, $http, $log, messenger, $location, oauthRequest) {

			$scope.loading = true;

			$scope.userList = [];

			// TODO: extract the jwt handling to a service factory,
			// then inject the "interior" function into the service method.
			// TODO: use a cookie instead of Web Storage, as it is more secure
			// var jwt = JSON.parse(localStorage.getItem('jwt'));

			// var a = oauthRequest.getToken();

			oauthRequest.get('http://localhost:50323/api/v1/user')
						.then(function success(response) {

							$scope.userList = _.map(response.data, function (user) {
								return {
									fullName: user.givenName + ' ' + user.familyName,
									email: user.email,
									phone: user.primaryPhoneNumber,
									userId: user.userId
								};
							});

						}, function error(response) {

							$log.error(response);

							if (response.status === 401) {
								messenger.unauthorized($scope);
							} else {
								messenger.showErrorMessage($scope, { error: response });
							}
						});

			// if (jwt) {
			// 	// TODO: validate that the user administration claim is present.
			// 	if (moment() < moment(jwt.expiresAt)) {

			// 		$http({
			// 			url: 'http://localhost:50323/api/v1/user',
			// 			method: 'GET',
			// 			headers: {
			// 				Authorization: 'bearer ' + jwt.access_token
			// 			}
			// 		})
			// 			.then(function success(response) {

			// 				$scope.userList = _.map(response.data, function (user) {
			// 					return {
			// 						fullName: user.givenName + ' ' + user.familyName,
			// 						email: user.email,
			// 						phone: user.primaryPhoneNumber,
			// 						userId: user.userId
			// 					};
			// 				});

			// 			}, function error(response) {

			// 				$log.error(response);

			// 				if (response.status === 401) {
			// 					messenger.unauthorized($scope);
			// 				} else {
			// 					messenger.showErrorMessage($scope, { error: response });
			// 				}
			// 			});
			// 	} else {
			// 		messenger.unauthorized($scope);
			// 	}
			// } else {
			// 	messenger.unauthorized($scope);
			// }

			$scope.gridRowClick = function (row) {
				$log.info(row);
			};
			$scope.gridOptions = {
				enableFiltering: true,
				rowTemplate: 'views/users/row.html',
				onRegisterApi: function (gridApi) {
					$scope.gridApi = gridApi;
				},
				data: 'userList',
				columnDefs: [
					{ name: 'fullName', displayName: 'Full Name' },
					{ name: 'email', displayName: 'E-mail Address' },
					{ name: 'phone', displayName: 'Phone Number' },
					{ name: 'userId', displayName: '', cellTemplate: '<div class="ui-grid-cell-contents" title="Edit"><a href="/#/users/{{row.entity.userId}}">Edit</a></div>' }
				]
			};

			$scope.createUser = function () {
				$location.path("/users/new");
			}

			$scope.loading = false;

		}]);
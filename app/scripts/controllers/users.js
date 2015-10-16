'use strict';

/**
 * @ngdoc function
 * @name flightNodeDemo.controller:LoginController
 * @description
 * # LoginController
 * Controller for the login page
 */
angular.module('flightNodeDemo')
	.controller('UserController', ['$scope', '$http', '$log', 'messenger',
	 function ($scope, $http, $log, messenger) {

		$scope.loading = true;

		$scope.userList = [];

		var jwt = JSON.parse(localStorage.getItem('jwt'));

		if (jwt) {
			// TODO: validate that the user administration claim is present.
			// TODO: validate the expiration date.
			if (moment() < moment(jwt.expiresAt)) {

				$http({
					url: 'http://localhost:50323/api/v1/user',
					method: 'GET',
					headers: {
						Authorization: 'bearer ' + jwt.access_token
					}
				})
					.then(function success(response) {

						$scope.userList = _.map(response.data, function (user) {
							return {
								fullName: user.givenName + ' ' + user.familyName,
								email: user.email,
								phone: (user.mobilePhoneNumber || user.phoneNumber),
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
			} else {
				messenger.unauthorized($scope);
			}
		} else {
			messenger.unauthorized($scope);
		}


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

		$scope.loading = false;

	}]);
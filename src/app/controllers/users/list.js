'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller:UserListController
 * @description
 * # UserListController
 * Controller for the user list page.
 */
angular.module('flightNodeApp')
	.controller('UserListController',
	 ['$scope', '$http', '$log', 'messenger', '$location', 'oauthRequest',
		function ($scope, $http, $log, messenger, $location, oauthRequest) {

			$scope.loading = true;

			$scope.userList = [];


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

			$scope.gridOptions = {
				enableFiltering: true,
				rowTemplate: 'app/views/row.html',
				onRegisterApi: function (gridApi) {
					$scope.gridApi = gridApi;
				},
				data: 'userList',
				columnDefs: [
					{ name: 'fullName', displayName: 'Full Name' },
					{ name: 'email', displayName: 'E-mail Address' },
					{ name: 'phone', displayName: 'Phone Number' },
					{
						name: 'userId',
						displayName: '',
						cellTemplate: '<div class="ui-grid-cell-contents" title="Edit"><a href="/#/users/{{row.entity.userId}}">Edit</a></div>' 
					}
				]
			};

			$scope.createUser = function () {
				$location.path("/users/new");
			}

			$scope.loading = false;

		}]);
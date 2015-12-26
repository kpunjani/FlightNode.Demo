'use strict';

flnd.userList = {
  retrieve: function(authService, config, $scope, messenger) {
		authService.get(config.users)
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

                messenger.displayErrorResponse($scope, response);
			});
  }
};

/**
 * @ngdoc function
 * @name flightNodeApp.controller:UserListController
 * @description
 * # UserListController
 * Controller for the user list page.
 */
angular.module('flightNodeApp')
	.controller('UserListController',
	 ['$scope', '$http', '$log', 'messenger', '$location', 'authService', 'config',
		function ($scope, $http, $log, messenger, $location, authService, config) {

			if (!(authService.isAdministrator() ||
				  authService.isCoordinator())) {
				$log.warn('not authorized to access this path');
				$location.path('/');
				return;
			}

			$scope.loading = true;

			$scope.userList = [];

			flnd.userList.retrieve(authService, config, $scope, messenger);

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
				$location.path('/users/new');
			};

			$scope.loading = false;

		}]);
'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller:WorktypeListController
 * @description
 * # WorktypeListController
 * Controller for the user list page.
 */
angular.module('flightNodeApp')
	.controller('WorktypeListController',
	 ['$scope', '$http', '$log', 'messenger', '$location', 'oauthRequest',
		function ($scope, $http, $log, messenger, $location, oauthRequest) {

			if (!(oauthRequest.isAdministrator() ||
				  oauthRequest.isCoordinator())) {
				$log.warn('not authorized to access this path');
				$location.path('/');
				return;
			}

			$scope.loading = true;

			$scope.list = [];

			oauthRequest.get('http://localhost:50323/api/v1/worktypes')
						.then(function success(response) {

							$scope.list = response.data;

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
				data: 'list',
				columnDefs: [
					{ name: 'description', displayName: 'Description' },
					{
						name: 'id',
						displayName: '',
						cellTemplate: '<div class="ui-grid-cell-contents" title="Edit"><a href="/#/worktypes/{{row.entity.id}}">Edit</a></div>' 
					}
				]
			};

			$scope.creatWorkType = function () {
				$location.path("/worktypes/new");
			}

			$scope.loading = false;

		}]);
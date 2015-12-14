'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller:LocationListController
 * @description
 * # LocationListController
 * Controller for the user list page.
 */
angular.module('flightNodeApp')
	.controller('LocationListController',
	 ['$scope', '$http', '$log', 'messenger', '$location', 'oauthRequest',
		function ($scope, $http, $log, messenger, $location, oauthRequest) {

			$scope.loading = true;

			$scope.list = [];

			oauthRequest.get('http://localhost:50323/api/v1/locations')
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
					{ name: 'latitude', displayName: 'Latitude' },
					{ name: 'longitude', displayName: 'Longitude' },
					{
						name: 'id',
						displayName: '',
						cellTemplate: '<div class="ui-grid-cell-contents" title="Edit"><a href="/#/locations/{{row.entity.id}}">Edit</a></div>' 
					}
				]
			};

			$scope.creatlocation = function () {
				$location.path("/locations/new");
			}

			$scope.loading = false;

		}]);
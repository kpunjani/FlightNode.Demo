'use strict';


/**
 * @ngdoc function
 * @name flightNodeApp.controller:WorkdayListController
 * @description
 * # WorkdayListController
 * Controller for the user list page.
 */
angular.module('flightNodeApp')
	.controller('WorkdayListController',
	 ['$scope', '$http', '$log', 'messenger', '$location', 'authService',
		function ($scope, $http, $log, messenger, $location, authService) {

			if (!(authService.isAdministrator() ||
				  authService.isCoordinator())) {
				$log.warn('not authorized to access this path');
				$location.path('/');
				return;
			}

			$scope.loading = true;

			$scope.list = [];


			authService.get('http://localhost:50323/api/v1/worklogs/export')
				.then(function success(response) {
					$scope.list = response.data;

				}, function error(response) {

							$log.error(response);

							if (response.status === 401) {
								messenger.unauthorized($scope);
							} else {
								messenger.showErrorMessage($scope, { error: response });
							}
						return null;
				});


			$scope.gridOptions = {
				enableFiltering: true,
				rowTemplate: 'app/views/row.html',
				onRegisterApi: function (gridApi) {
					$scope.gridApi = gridApi;
				},
				data: 'list',
				columnDefs: [
					{ name: 'locationName', displayName: 'Location' },
					{ name: 'workDate', display: 'Date' },
					{ name: 'person', displayName: 'Person' },
					{ name: 'workHours', displayName: 'Work Hours' },
					{ name: 'travelTimeHours', displayName: 'Travel Hours' },
					{
						name: 'id',
						displayName: '',
						cellTemplate: '<div class="ui-grid-cell-contents" title="Edit"><a href="/#/workday/{{row.entity.id}}">Edit</a></div>'
					}
				]
			};

			$scope.creatWorkType = function () {
				$location.path("/worktypes/new");
			};

			$scope.exportData = function() {
				return $scope.list;
			};

			$scope.getHeader = function() {
				return [ 'Id', 'WorkDate', 'WorkHours', 'TravelTimeHours', 'WorkTypeId', 'WorkType', 'LocationId', 'Location', "Longitude", 'Latitude', 'UserId', 'Person' ];
			};

			$scope.loading = false;

		}]);
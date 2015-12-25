'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller.worktype:WorktypeEditController
 * @description
 * # WorktypeEditController
 * Controller for the edit work type page.
 */
angular.module('flightNodeApp')
	.controller('WorktypeEditController',
		['$scope', '$http', '$log', '$location', 'messenger', 'authService', '$routeParams',
			function ($scope, $http, $log, $location, messenger, authService, $routeParams) {

				if (!(authService.isAdministrator() ||
					  authService.isCoordinator())) {
					$log.warn('not authorized to access this path');
					$location.path('/');
					return;
				}

				$scope.loading = true;

				var id = $routeParams.id;
				if (!isFinite(id)) {
					// garbage input
					return;
				}

				var url = 'http://localhost:50323/api/v1/worktypes/' +id;

				authService.get(url)
					.then(function success(response) {
						$scope.worktype = response.data;

					}, function error(response) {
                		messenger.displayErrorResponse($scope, response);
					});


				$scope.cancel = function () {
					$location.path('/worktypes');
				}

				$scope.submit = function () {
					$scope.loading = true;

					authService.put(url, $scope.worktype)
						.then(function success(response) {

							messenger.showSuccessMessage($scope, 'Saved');
							$scope.loading = false;

						}, function error(response) {
                			messenger.displayErrorResponse($scope, response);
						})
						.finally(function(){
							$scope.loading = false;
						});
				};

				$scope.loading = false;
			}]);
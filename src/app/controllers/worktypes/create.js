'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller.worktype:WorktypeCreateController
 * @description
 * # WorktypeCreateController
 * Controller for the create work type page.
 */
angular.module('flightNodeApp')
	.controller('WorktypeCreateController',
		['$scope', '$http', '$log', '$location', 'messenger', 'authService',
			function ($scope, $http, $log, $location, messenger, authService) {

				if (!(authService.isAdministrator() ||
					  authService.isCoordinator())) {
					$log.warn('not authorized to access this path');
					$location.path('/');
					return;
				}

				$scope.loading = true;

				$scope.cancel = function () {
					$location.path('/worktypes');
				}

				$scope.submit = function () {
					$scope.loading = true;

					authService.post('http://localhost:50323/api/v1/worktypes', $scope.worktype)
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
'use strict';

flnd.workTypeCreate = {
	configureSubmit: function(config, $scope, messenger, authService) {
		return function () {
					$scope.loading = true;

					authService.post(config.workTypes, $scope.worktype)
						.then(function success() {

							messenger.showSuccessMessage($scope, 'Saved');
							$scope.loading = false;

						}, function error(response) {
                			messenger.displayErrorResponse($scope, response);
						})
						.finally(function(){
							$scope.loading = false;
						});
				};
	}
};

/**
 * @ngdoc function
 * @name flightNodeApp.controller.worktype:WorktypeCreateController
 * @description
 * # WorktypeCreateController
 * Controller for the create work type page.
 */
angular.module('flightNodeApp')
	.controller('WorktypeCreateController',
		['$scope', '$http', '$log', '$location', 'messenger', 'authService', 'config',
			function ($scope, $http, $log, $location, messenger, authService, config) {

				if (!(authService.isAdministrator() ||
					  authService.isCoordinator())) {
					$log.warn('not authorized to access this path');
					$location.path('/');
					return;
				}

				$scope.loading = true;

				$scope.cancel = function () {
					$location.path('/worktypes');
				};

				$scope.submit = flnd.workTypeCreate.configureSubmit(config, $scope, messenger, authService);

				$scope.loading = false;
			}]);
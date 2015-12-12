'use strict';

/**
 * @ngdoc function
 * @name flightNodeDemo.controller:WorktypeListController
 * @description
 * # WorktypeListController
 * Controller for the user list page.
 */
angular.module('flightNodeDemo')
	.controller('WorktypeListController',
	 ['$scope', '$http', '$log', 'messenger', '$location',
		function ($scope, $http, $log, messenger, $location) {

			$scope.loading = true;

			$scope.loading = false;

		}]);
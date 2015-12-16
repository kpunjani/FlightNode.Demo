'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller:MainController
 * @description
 * # MainController
 * Controller for the default/main page
 */
angular.module('flightNodeApp')
	.controller('MainController', function ($scope) {
	$scope.loading = true;

	$scope.loading = false;
  });

'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller:NavigationController
 * @description
 * # NavigationController
 * Controller that  handles user logout
 */
angular.module('flightNodeApp')
	.controller('NavigationController',
		['$log', 'authService', '$scope',
		function ($scope, $log, authService) {

			var tree = {
				children: [
				{
				 	Home:  {
				 		_root: '#/',
				 		children: [
				 			{ Settings: '#/settings' },
				 			{ Login: '#/login' },
				 			{ Logout: '#/logout' }
				 		]
			 		}
				 },
				 {
				 	User: {
				 		_root: '#/users',
				 		children: [
				 			{ 'Manage Users': '#/users' },
				 			{ 'New User': '#/users/new' }
			 			]
				 	}
				}
			]};

			var nav = '<ul>';

			var build = function(top) {
		 		top.forEach(function(child, i) {
		 			nav += '<li>' + i.toString() + ': ' + child[0] + '</li>';
		 		});
		    };

		    build(tree.children);

			nav += '\r</ul>';
			$scope.navigation = nav;

		}]
	);
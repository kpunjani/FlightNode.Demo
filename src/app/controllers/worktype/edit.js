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
		['$scope', '$http', '$log', '$location', 'messenger', 'oauthRequest', '$routeParams',
			function ($scope, $http, $log, $location, messenger, oauthRequest, $routeParams) {

				$scope.loading = true;

				var id = $routeParams.id;
				if (!isFinite(id)) {
					// garbage input
					return;
				}

				var url = 'http://localhost:50323/api/v1/worktypes/' +id;

				oauthRequest.get(url)
					.then(function success(response) {
						$scope.worktype = response.data;

					}, function error(response) {

						switch (response.status) {
							case 400:
								var messages = [{ error: response.data.message }];
								if (response.data.modelState) {
									_.forIn(response.data.modelState, function (value, key) {
										messages.push({ error: value.toString() });
									});
								}
								messenger.showErrorMessage($scope, messages);
								break;
							case 401:
								messenger.unauthorized($scope);
								break;
							default:
								messenger.showErrorMessage($scope, { error: response });
						}
					});


				$scope.cancel = function () {
					$location.path('/worktypes');
				}

				$scope.submit = function () {
					$scope.loading = true;

					oauthRequest.put(url, $scope.worktype)
						.then(function success(response) {

							messenger.showSuccessMessage($scope, 'Saved');
							$scope.loading = false;

						}, function error(response) {

							switch (response.status) {
								case 400:
									var messages = [{ error: response.data.message }];
									if (response.data.modelState) {
										_.forIn(response.data.modelState, function (value, key) {
											messages.push({ error: value.toString() });
										});
									}
									messenger.showErrorMessage($scope, messages);
									break;
								case 401:
									messenger.unauthorized($scope);
									break;
								default:
									messenger.showErrorMessage($scope, { error: response });
							}
							$scope.loading = false;
						});
				};

				$scope.loading = false;
			}]);
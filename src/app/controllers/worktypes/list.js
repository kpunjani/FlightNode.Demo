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

            authService.get('http://localhost:50323/api/v1/worktypes')
                        .then(function success(response) {

                            $scope.list = response.data;

                        }, function error(response) {
                            messenger.displayErrorResponse($scope, response);
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
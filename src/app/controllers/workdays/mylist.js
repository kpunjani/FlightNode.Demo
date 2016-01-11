//WorkdayMyListController

'use strict';

flnd.myWorkDayList = {
    retrieveRecords: function(config, $scope, messenger, authService) {
        $scope.list = [];

        // Todo: retrieve the locations, or load them in the data model server side.

        authService.get(config.workLogsForUser)
            .then(function success(response) {
                $scope.list = response.data;

            }, function error(response) {
                messenger.displayErrorResponse($scope, response);
                return null;
            });
    }
};

/**
 * @ngdoc function
 * @name flightNodeApp.controller:WorkdayMyListController
 * @description
 * # WorkdayMyListController
 * Controller for the user list page.
 */
angular.module('flightNodeApp')
    .controller('WorkdayMyListController',
     ['$scope', '$http', '$log', 'messenger', '$location', 'authService', 'config','$uibModal',
        function ($scope, $http, $log, messenger, $location, authService, config, $uibModal) {

            $scope.loading = true;

            flnd.myWorkDayList.retrieveRecords(config, $scope, messenger, authService);

            $scope.gridOptions = {
                enableFiltering: true,
                rowTemplate: 'app/views/row.html',
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                },
                data: 'list',
                columnDefs: [
                    // { 
                    //   field: 'workMonth',
                    //   displayName: 'Month'
                    // },
                    { field: 'workDate', display: 'Date' },
                    { field: 'locationName', displayName: 'Location' },
                    { field: 'workHours', displayName: 'Work Hours' },
                    { field: 'travelTimeHours', displayName: 'Travel Hours' },
                    { field: 'workType', displayName: 'Work Type' },
                    {
                        field: 'id',
                        displayName: '',
                        cellTemplate: '\
                        <div class="ui-grid-cell-contents" title="Edit">\
                          <button class="btn btn-primary btn-xs" ng-click="grid.appScope.editWorkDay(row.entity.id)" \
                           aria-label="edit">\
                              <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>\
                          </button>\
                        </div>',
                        enableFiltering: false,
                        width: '32',
                        enableColumnMenu: false
                    }
                ]
            };


            $scope.exportData = function() {
                return $scope.list;
            };

            var success = function() {
                // Re-load the grid
                flnd.myWorkDayList.retrieveRecords(config, $scope, messenger, authService);
                messenger.showSuccessMessage($scope, 'Saved');
            };

            var dismissed = function() {
                // no action required
            };

            $scope.createWorkDay = function () {
                var modal = $uibModal.open({
                    animation: true,
                    templateUrl: '/app/views/workdays/create.html',
                    controller: 'WorkdayCreateController',
                    size: 'lg'
                });
                modal.result.then(success, dismissed);
            };

            $scope.editWorkDay = function(id) {
                var modal = $uibModal.open({
                    animation: true,
                    templateUrl: '/app/views/workdays/edit.html',
                    controller: 'WorkdayEditController',
                    size: 'lg',
                    resolve: {
                        id: function() {
                            return id;
                        }
                    }
                });
                modal.result.then(success, dismissed);
            };

            $scope.getHeader = function() {
                return [ 'Id', 'Month', 'WorkDate', 'WorkHours', 'TravelTimeHours', 'WorkType', 'Location' ];
            };

            $scope.loading = false;

        }]);
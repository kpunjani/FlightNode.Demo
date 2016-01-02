'use strict';

flnd.workDayList = {
    retrieveRecords: function(config, $scope, messenger, authService) {
        $scope.list = [];

        authService.get(config.exportWorkLogs)
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
 * @name flightNodeApp.controller:WorkdayListController
 * @description
 * # WorkdayListController
 * Controller for the user list page.
 */
angular.module('flightNodeApp')
    .controller('WorkdayListController',
     ['$scope', '$http', '$log', 'messenger', '$location', 'authService', 'config',
        function ($scope, $http, $log, messenger, $location, authService, config) {

            if (!(authService.isAdministrator() ||
                  authService.isCoordinator())) {
                $log.warn('not authorized to access this path');
                $location.path('/');
                return;
            }

            $scope.loading = true;

            flnd.workDayList.retrieveRecords(config, $scope, messenger, authService);

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
                        cellTemplate: '<div class="ui-grid-cell-contents" title="Edit"><a ng-href="/#/workdays/{{row.entity.id}}?p={{row.entity.person | htmlEncode}}">Edit</a></div>'
                    }
                ]
            };

            $scope.createWorkDay = function () {
                $location.path('/workdays/new');
            };

            $scope.exportData = function() {
                return $scope.list;
            };

            $scope.getHeader = function() {
                return [ 'Id', 'WorkDate', 'WorkHours', 'TravelTimeHours', 'WorkTypeId', 'WorkType', 'LocationId', 'Location', 'Longitude', 'Latitude', 'UserId', 'Person' ];
            };

            $scope.loading = false;

        }]);
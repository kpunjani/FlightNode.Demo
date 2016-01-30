'use strict';

/**
 * @ngdoc function
 * @name flightNodeApp.controller:UserPendingController
 * @description
 * # UserPendingController
 * Controller for the user list page.
 */
angular.module('flightNodeApp')
    .controller('UserPendingController',
     ['$scope', '$http', '$log', 'messenger', '$location', 'authService', 'config', 'userProxy',
        function ($scope, $http, $log, messenger, $location, authService, config, userProxy) {

            if (!(authService.isAdministrator() ||
                  authService.isCoordinator())) {
                $log.warn('not authorized to access this path');
                $location.path('/');
                return;
            }

            $scope.loading = true;

            userProxy.pending($scope);

            $scope.selected = [];

            $scope.gridOptions = {
                enableRowSelection: true,
                enableSelectAll: true,
                selectionRowHeaderWidth: 35,
                multiSelect: true,
                enableFiltering: true,
                showGridFooter:true,
                rowTemplate: 'app/views/row.html',
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    gridApi.selection.on.rowSelectionChanged($scope,function(row){
                      var msg = 'row selected ' + row.isSelected;
                      $log.log(row.entity.userId);
                    });

                    gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
                      var msg = 'rows changed ' + rows.length;
                      $log.log(msg);
                    });
                },
                data: 'users',
                columnDefs: [
                    { field: 'userId', visible: false },
                    { field: 'displayName', displayName: 'Full Name' },
                    {
                        field: 'email',
                        displayName: 'E-mail Address',
                        cellTemplate: '\
                        <div class="ui-grid-cell-contents" title="Edit">\
                          <a href="mailto:{{row.entity.email}}">{{row.entity.email}}</a> \
                        </div>',
                    },
                    { field: 'primaryPhoneNumber', displayName: 'Phone 1' },
                    { field: 'secondaryPhoneNumber', displayName: 'Phone 2' },
                ]
            };

            $scope.approve = function () {
                var rows = $scope.gridApi.selection.getSelectedRows();
                var ids = _.map(rows, function(row) {
                    return row.userId;
                });

                var msg = 'The following new users have been activated: <ul>';
                _.forEach(rows, function(row) {
                    msg += '<li>' + row.displayName + '</li>';
                });
                msg += '</ul>';

                $log.info(ids);
                userProxy.approve($scope, ids, msg)
            };

            $scope.loading = false;

        }]);
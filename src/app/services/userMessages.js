'use strict';

angular.module('userMessage', [])
    .factory('messenger', ['$log', function ($log) {
        return {
            showErrorMessage: function ($scope, data) {

                if (!Array.isArray(data)) {
                    data = [data];
                }

                $scope.alerts = [];

                _.forEach(data, function (d) {
                    var msg = d;
                    if (d.error) {
                        msg = d.error;
                    }

                    if (d.error_description) {
                        msg += ': ' + d.error_description;
                    }

                    $scope.alerts.push({ type: 'danger', msg: msg });
                });

            },

            showSuccessMessage: function ($scope, msg) {
                $scope.alerts = [
                    { type: 'success', msg: msg }
                ];
            },

            unauthorized: function ($scope) {

                $scope.alerts = [
                    { type: 'warning', msg: 'Must be logged in to use this page.' }
                ];
            },

            displayErrorResponse: function($scope, response) {
                var $this = this;

                $log.error(response);

                switch (response.status) {
                    case -1:
                        $this.showErrorMessage($scope, 'Back-end service is currently offline.');
                        break;
                    case 400:
                        var messages = [{ error: response.data.message }];
                        if (response.data.modelState) {
                            _.forIn(response.data.modelState, function (value) {
                                messages.push({ error: value.toString() });
                            });
                        }
                        $this.showErrorMessage($scope, messages);
                        break;
                    case 401:
                        $this.unauthorized($scope);
                        break;
                    case 500:
                        var message = 'A server error occurred. Please try once more. If the problem continues, then contact an administrator.';
                        $this.showErrorMessage($scope, message);
                        break;
                    default:
                        $this.showErrorMessage($scope, { error: response });
                }
            }
        };
    }]);
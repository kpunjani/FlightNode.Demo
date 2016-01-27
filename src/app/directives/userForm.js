(function() {
  'use strict';
  /**
   *  @ngdoc overview
   *  @name userForm
   *
   *  @description
   *
   *  #userForm
   *
   *  This module provides provides a standard form for editing a user.
   */
  angular.module('flightNodeApp')
  .directive('userForm', [function () {
    return {
      restrict: 'E',
      templateUrl: 'app/views/users/form.html',
      link: function (scope, element, attributes) {
        scope.formTitle = attributes.formTitle;
        scope.showRoles = attributes.showRoles || true;
      }
    };
  }]);
})();

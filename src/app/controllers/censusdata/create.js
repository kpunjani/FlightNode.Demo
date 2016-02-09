'use strict';

flnd.birdSpeciesList = {
    retrieveRecords: function(config, $scope, messenger, authService) {

        $scope.birdSpeciesList = {};

        authService.get(config.birdspecies)
            .then(function success(response) {

                $scope.birdSpeciesList = response.data;

            }, function error(response) {

                messenger.displayErrorResponse($scope, response);

            });
    }
};


/**
 * @ngdoc function
 * @name flightNodeApp.controller:CensusDataCreateController
 * @description
 * # CensusDataCreateController
 * Controller for the create census form.
 */
angular.module('flightNodeApp')
    .controller('CensusDataCreateController', 
    ['$scope', 'authService', 'config', 'messenger', 'censusFormService',
    function ($scope, authService, config, messenger, censusFormService) {
		$scope.loading = true;
        $scope.data = {};
        flnd.birdSpeciesList.retrieveRecords(config, $scope, messenger, authService);
        flnd.locationList.retrieveRecords(config, $scope, messenger, authService);
        
        //main payload which will be delivered to api for persistence.
        $scope.censusForm = censusFormService.censusForm;
        
        //Lookup data coming from hard coded arrays.
        $scope.data.tideInfo = censusFormService.tideInfo;         
        $scope.data.weatherInfo = censusFormService.weatherInfo;
        $scope.data.vantagePointInfo = censusFormService.vantagePointInfo;
        $scope.data.accessPointInfo = censusFormService.accessPointInfo;
        $scope.data.siteTypeInfo = censusFormService.siteTypeInfo;        
        $scope.data.feedingRateInfo = censusFormService.feedingRateInfo;
        $scope.data.habitatInfo = censusFormService.habitatInfo;
        $scope.data.behaviourTypeInfo = censusFormService.behaviourTypeInfo;
        $scope.data.disturbanceTypeInfo = censusFormService.disturbanceTypeInfo;
        
        //Method to set the birdSpeciesId from the UI.
        $scope.setBirdId = function(index, birdSpeciesId){
            censusFormService.censusForm.spottedBirdsInfo[index].birdSpeciesId = birdSpeciesId;
        };
        
        //Method to set the disturbanceTypeId from the UI.
        $scope.setDisturbanceTypeId = function(index, disturbanceTypeId){
            censusFormService.censusForm.disturbanceData[index].disturbanceTypeId = disturbanceTypeId;
        };
        $scope.loading = false;
  }]);

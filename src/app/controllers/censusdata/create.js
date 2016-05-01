'use strict';

flnd.censusDataCreate = {
    retrieveBirds: function(config, $scope, messenger, authService) {

        $scope.birdSpeciesList = {};

        authService.get(config.birdspecies + '?surveyTypeId=2')        
            .then(function success(response) {

                $scope.birdSpeciesList = response.data;

            }, function error(response) {

                messenger.displayErrorResponse($scope, response);

            });
    },
    configureSubmit: function($scope, config, messenger, authService, censusFormService, $location, $log){
        return function(){
            $scope.loading = true;
            //TODO: This function further needs tidying up. Mainly focusing upon upon integration with backend. Once basic flow start to work, will clean it.
            //EX: Instead of manually making PutUrl, need to fetch the Location from header of POST reposnse and then use that as PUT URL.
            if($scope.censusForm.surveyId === undefined) //First time POST
            {                
                authService.post(config.waterbirdForagingSurvey, $scope.censusForm)
                    .then(function success(response){
                            var currentStep = censusFormService.censusForm.step;
                            var toMoveNext = censusFormService.censusForm.saveAndMoveNext;
                            var saveForLater = censusFormService.censusForm.saveForLater;
                            //Load the response data from the API back into scope.
                            $scope.censusForm = response.data;
                            $scope.censusForm.PutUrl = config.waterbirdForagingSurvey + response.data.surveyIdentifier;
                            $scope.censusForm.step = currentStep;
                            $scope.censusForm.saveForLater = saveForLater;
                            censusFormService.censusForm = $scope.censusForm;

                            if (toMoveNext && censusFormService.censusForm.step === 1){
                                $location.path('/foraging/create2');                
                            }
                            if (toMoveNext && censusFormService.censusForm.step === 2){
                                $location.path('/foraging/create3');                
                            }
                        }, function error(response){
                            messenger.displayErrorResponse($scope, response);
                        })
                    .finally(function(){
                        $scope.loading = false;
                    });
            }
            else { //Subsequent updates
                var saveForLater = censusFormService.censusForm.saveForLater;
                var toFinish = censusFormService.censusForm.saveAndFinish;
                if(toFinish){
                    censusFormService.censusForm.step = 4;
                    $scope.censusForm.step = 4;
                }
                var putUrl = config.waterbirdForagingSurvey + $scope.censusForm.surveyIdentifier;
                
                authService.put(putUrl, $scope.censusForm)
                    .then(function success(response){
                            var currentStep = censusFormService.censusForm.step;
                            var toMoveNext = censusFormService.censusForm.saveAndMoveNext;
                            var saveForLater = censusFormService.censusForm.saveForLater;
                            //Load the response data from the API back into scope.
                            $scope.censusForm = response.data;
                            $scope.censusForm.step = currentStep;
                            $scope.censusForm.saveForLater = saveForLater;
                            
                            censusFormService.censusForm = $scope.censusForm;
                            if (toFinish){
                                $location.path('/foraging/create4');
                            }
                            else if (toMoveNext && censusFormService.censusForm.step === 1){
                                $location.path('/foraging/create2');                
                            }
                            else if (toMoveNext && censusFormService.censusForm.step === 2){
                                $location.path('/foraging/create3');                
                            }
                        }, function error(response){
                            messenger.displayErrorResponse($scope, response);
                        })
                    .finally(function(){
                        $scope.loading = false;
                    });
            }             
        };
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
    ['$scope', 'authService', 'config', 'messenger', 'censusFormService','$filter','$location', '$log',
    function ($scope, authService, config, messenger, censusFormService, $filter, $location, $log) {
		$scope.loading = true;
        $scope.saveForLater=false;
        $scope.data = {};
        
        flnd.censusDataCreate.retrieveBirds(config, $scope, messenger, authService);
        flnd.locationList.retrieveRecords(config, $scope, messenger, authService);
        
        //Lookup data coming from hard coded arrays.
        $scope.data.tideInfo = censusFormService.tideInfo;         
        $scope.data.weatherInfo = censusFormService.weatherInfo;
        $scope.data.vantagePointInfo = censusFormService.vantagePointInfo;
        $scope.data.accessPointInfo = censusFormService.accessPointInfo;
        $scope.data.siteTypeInfo = censusFormService.siteTypeInfo;
        $scope.data.siteTypeActivityInfo = censusFormService.siteTypeActivityInfo;
        $scope.data.feedingRateInfo = censusFormService.feedingRateInfo;
        $scope.data.habitatInfo = censusFormService.habitatInfo;
        $scope.data.behaviorTypeInfo = censusFormService.behaviorTypeInfo;
        $scope.data.disturbanceTypeInfo = censusFormService.disturbanceTypeInfo;
        
        //Method to set the birdSpeciesId from the UI.
        $scope.setBirdId = function(index, birdSpeciesId){
            censusFormService.censusForm.observations[index].birdSpeciesId = birdSpeciesId;
        };
        
        //Method to set the disturbanceTypeId from the UI.
        $scope.setDisturbanceTypeId = function(index, disturbanceTypeId){
            censusFormService.censusForm.disturbances[index].disturbanceTypeId = disturbanceTypeId;
        };
        
        //main payload which will be delivered to api for persistence.
        $scope.censusForm = censusFormService.censusForm;
        $scope.submit = flnd.censusDataCreate.configureSubmit($scope, config, messenger, authService, censusFormService, $location);
        $scope.loading = false;
  }]);

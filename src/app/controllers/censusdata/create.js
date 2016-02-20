'use strict';

flnd.birdSpeciesList = {
    retrieveRecords: function(config, $scope, messenger, authService) {

        $scope.birdSpeciesList = {};

        authService.get(config.birdspeciesBySurveyType)        
            .then(function success(response) {

                $scope.birdSpeciesList = response.data;

            }, function error(response) {

                messenger.displayErrorResponse($scope, response);

            });
    }
};

flnd.censusDataCreate = {
    //  moveToNextPage: function(toMoveNext, step, $location){
    //     if (toMoveNext && step === 1){
    //         $location.path('/censusdata/create2');                
    //     }
    //     if (toMoveNext && step === 2){
    //         $location.path('/censusdata/create3');                
    //     }
    // },
    configureSubmit: function($scope, config, messenger, authService, censusFormService, $location){
        return function(){
            $scope.loading = true;
            console.log($scope.censusForm.surveyId);
            console.log('method is called');
            if($scope.censusForm.surveyId === undefined) //First time POST
            {
                authService.post(config.waterbirdForagingSurvey, $scope.censusForm)
                    .then(function success(response){
                            console.log('before' + censusFormService.censusForm.saveAndMoveNext);
                            var toMoveNext = censusFormService.censusForm.saveAndMoveNext;
                            censusFormService.censusForm = $scope.censusForm = response.data; 
                            $scope.saveForLater = true;
                            console.log('after' + censusFormService.censusForm.saveAndMoveNext);
                            //TODO: Need to distiguish between Save for Later call or Save & Next call. location path will move forward for later.
                            //this.moveToNextPage(toMoveNext, censusFormService.censusForm.step, $location);
                            if (toMoveNext && censusFormService.censusForm.step === 1){
                                $location.path('/censusdata/create2');                
                            }
                            if (toMoveNext && censusFormService.censusForm.step === 2){
                                $location.path('/censusdata/create3');                
                            }
                        }, function error(response){
                            messenger.displayErrorResponse($scope, response);
                        })
                    .finally(function(){
                        $scope.loading = false;
                    });
            }else{ //Subsequent updates
                authService.put(config.waterbirdForagingSurvey, $scope.censusForm)
                    .then(function success(response){
                        censusFormService.censusForm = $scope.censusForm = response.data;
                        console.log($scope.censusForm);
                        
                        console.log($scope.censusForm.surveyId)
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
    ['$scope', 'authService', 'config', 'messenger', 'censusFormService','$filter','$location',
    function ($scope, authService, config, messenger, censusFormService, $filter, $location) {
		$scope.loading = true;
        $scope.data = {};
        
        flnd.birdSpeciesList.retrieveRecords(config, $scope, messenger, authService);
        flnd.locationList.retrieveRecords(config, $scope, messenger, authService);
        
        //censusFormService.censusForm.surveyId = 0;
        // censusFormService.censusForm.surveyDate = new Date();
        // censusFormService.censusForm.departTime = censusFormService.censusForm.surveyDate.toTimeString().slice(0, 5);
        // 
        // censusFormService.censusForm.surveyDate = Date.parse(censusFormService.censusForm.surveyDate);
       // censusFormService.censusForm.surveyDate = (censusFormService.censusForm.surveyDate | date:'yyyy-MM-dd HH:mm:ss Z');
        

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
        // 
        // $scope.submit = function(){
        //     console.log($scope.censusForm)
        // }
        
        
        $scope.submit = flnd.censusDataCreate.configureSubmit($scope, config, messenger, authService, censusFormService, $location);
        
        $scope.submitAndMoveNext = function(){
            flnd.censusDataCreate.configureSubmit($scope, config, messenger, authService, censusFormService);
            
            if (censusFormService.censusForm.step==1){            
                $location.path('/censusdata/create2');                
            }
            if (censusFormService.censusForm.step==2){            
                $location.path('/censusdata/create3');                
            }
            ///console.log("button clicked;");          
            
        };
        
        $scope.loading = false;
  }]);

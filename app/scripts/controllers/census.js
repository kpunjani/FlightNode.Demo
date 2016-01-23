'use strict';

/**
 * @ngdoc function
 * @name flightNodeDemo.controller:CensusController
 * @description
 * # CensusController
 * Controller of the flightNodeDemo
 */
angular.module('flightNodeDemo')
    .controller('CensusController', function ($scope) {
		$scope.loading = true;
      
        //TODO: Get all this data from DB through API calls. Since it is all lookup data, we may cache it through out the application's lifetime.
        $scope.tideInfo = [
            { Id: 1, Description: "Water level appears high" },
            { Id: 2, Description: "Water level appears low" },
            { Id: 3, Description: "Wind driven" },
            { Id: 4, Description: "Non-tidal" },      
        ];
        
        $scope.weatherInfo = [
            { Id: 1, Description: "Clear"},
            { Id: 2, Description: "Partly cloudy"},
            { Id: 3, Description: "Overcast"},
            { Id: 4, Description: "Fog or smoke"},
            { Id: 5, Description: "Drizzle"},
            { Id: 6, Description: "Showers"},
        ];
        
        $scope.vantagePointInfo = [
            { Id: 1, Description: "On-Site Visit"},
            { Id: 2, Description: "View from adj area by vehicle/boat/on foot"},
        ];
        
        $scope.accessPointInfo = [
            { Id: 1, Description: "On Foot"},
            { Id: 2, Description: "Vessel (motor)"},
            { Id: 3, Description: "Kayak/ Canoe"}
        ];
        
        $scope.siteTypeInfo = [
            { Id: 1, Description: "New Colony"},
            { Id: 2, Description: "Surveyed, Inactive"},
            { Id: 3, Description: "Prev. Known Colony (Count only)"},
            { Id: 4, Description: "Surveyed, Active"},
            { Id: 5, Description: "Prev. Known Colony (Count and Description Update)"},
        ];
        
        $scope.feedingRateInfo = [
            { Id: 1, Description: "Low Success"},
            { Id: 2, Description: "Medium Success"},
            { Id: 3, Description: "High Success"},
        ];
        
        $scope.habitatInfo = [
            { Id: 1, Description: "Open Water Below Knee"},
            { Id: 2, Description: "Open Water Above Knee"},
            { Id: 3, Description: "Manmade (ditch, culvert, etc..)"},        
            { Id: 4, Description: "Forest"},
            { Id: 5, Description: "Stream"},
            { Id: 6, Description: "Seagrass Beds"},
            { Id: 7, Description: "Low Marsh"},
            { Id: 8, Description: "High Marsh"},
            { Id: 9, Description: "Scrub-Shrub"},
            { Id: 10, Description: "Tall Grass"},
            { Id: 11, Description: "Open Water"},
            { Id: 12, Description: "Beach"},
            { Id: 13, Description: "Mudflat"},
            { Id: 14, Description: "Pond"},
        ];
        
        $scope.loading = false;
  });

'use strict';

var bodyStats = angular.module("bodyStats", []);


/**
 * Factory Definition
 */
bodyStats.factory("MainFactory", function($http){
    var factory = {

        // DB request
        getData: function () {
            return $http.get("http://localhost:3000/load");
        },

        // Set/Update DB with new data
        insertNewProfile: function(newProfile) {
            $http.post("http://localhost:3000/save", newProfile).success(function(){
               console.log('boom');
            });
        }

    };

    return factory;
});





/**
 * Main Controller
 */
bodyStats.controller("MainController", function($http, $scope, MainFactory){

    // Initialize app
    MainFactory.getData().success(function(result){
        $scope.profiles = result;
    });


    // Insert New Profile
    $scope.insertProfile = function(){
        var newProfile = {
            name: $scope.newName,
            entries: []
        };

        newProfile.entries.push(
            {
                date: $scope.newDate,
                weight: $scope.newWeight,
                fat_chest: $scope.new_fatChest,
                fat_abdominal: $scope.newFatAbdominal,
                fat_thigh: $scope.newFatThigh,
                fat_triceps: $scope.newFatTriceps,
                fat_subscapular: $scope.newFatSubscapular,
                fat_suprailiac: $scope.newFatSuprailiac,
                fat_midaxillary: $scope.newFatMidaxillary,
                neck: $scope.newNeck,
                shoulders: $scope.newShoulders,
                chest: $scope.newChest,
                biceps: $scope.newBiceps,
                waist: $scope.newWaist,
                hips: $scope.newHips,
                thigh: $scope.newThigh
            }
        );

        MainFactory.insertNewProfile(newProfile);
    }

});






'use strict';

var bodyStats = angular.module("bodyStats", []);


/**
 * Factory Definition
 */
bodyStats.factory("MainFactory", function($http){
    var factory = {

        // DB request
        getData: function () {
            // TODO: loading spinner?
            return $http.get("http://localhost:3000/load");
        },

        // Set/Update DB with new data
        insertNewProfile: function(newEntry) {
            $http.post("http://localhost:3000/save", newEntry).success(function(){
               console.log('boom');
                // Todo: do something here
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


    // Inserts or updates profile
    $scope.insertData = function(){

        var newEntry = {
            _id: $scope.newId,
            name: $scope.newName,
            entry: {
                date: $scope.newDate,
                weight: $scope.newWeight,
                fat_chest: $scope.newFat_chest,
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
        };

        MainFactory.insertNewProfile(newEntry);

       //TODO: reload
    }

});






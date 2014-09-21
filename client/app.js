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
                // TODO: confirmation message?
            });
        }

    };

    return factory;
});





/**
 * Main Controller
 */
bodyStats.controller("MainController", function($http, $scope, MainFactory){

    // Blank form
    var emptyForm = {
        _id: '',
        name: '',
        entry: {
            date: '',
            weight: '',
            fat_chest: '',
            fat_abdominal: '',
            fat_thigh: '',
            fat_triceps: '',
            fat_subscapular: '',
            fat_suprailiac: '',
            fat_midaxillary: '',
            neck: '',
            shoulders: '',
            chest: '',
            biceps: '',
            waist: '',
            hips: '',
            thigh: ''
        }
    };

    // Loads data
    MainFactory.getData().success(function(result){
        $scope.profiles = result;
    });

    // temporary solution for auto load new inserted results
    $scope.refresh = function(){
        // Loads data
        MainFactory.getData().success(function(result){
            $scope.profiles = result;
        });
    }


    // Inserts or updates profile
    $scope.insertData = function(){

        var newEntry = {
            _id: $scope.entry.newId,
            name: $scope.entry.newName,
            entry: {
                date: $scope.entry.newDate,
                weight: $scope.entry.newWeight,
                fat_chest: $scope.entry.newFat_chest,
                fat_abdominal: $scope.entry.newFatAbdominal,
                fat_thigh: $scope.entry.newFatThigh,
                fat_triceps: $scope.entry.newFatTriceps,
                fat_subscapular: $scope.entry.newFatSubscapular,
                fat_suprailiac: $scope.entry.newFatSuprailiac,
                fat_midaxillary: $scope.entry.newFatMidaxillary,
                neck: $scope.entry.newNeck,
                shoulders: $scope.entry.newShoulders,
                chest: $scope.entry.newChest,
                biceps: $scope.entry.newBiceps,
                waist: $scope.entry.newWaist,
                hips: $scope.entry.newHips,
                thigh: $scope.entry.newThigh
            }
        };

        MainFactory.insertNewProfile(newEntry);

        // clears form
        $scope.entry = emptyForm;


    }

});






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
        insertNewProfile: function(newEntry) {
            return $http.post("http://localhost:3000/save", newEntry);
        },

        // Removes single entry
        removeEntry: function(removeThisEntry){
            return $http.post("http://localhost:3000/rem_entry", removeThisEntry);
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


    // Refreshes local scope
    $scope.refresh = function(){
        // Loads data
        MainFactory.getData().success(function(result){
            $scope.profiles = result;
        });
    };

    // Click Event: Removes Entry
    $scope.removeEntry = function(profileID, entryDate){
        var removeThisEntry = {
            '_id': profileID,
            'entryDate': entryDate
        };
        MainFactory.removeEntry(removeThisEntry).success(function(){
            // TODO: success message?
            $scope.refresh();
        });
    };

    // Click Event: Removes Profile (user)
    $scope.removeUser = function(profileID){
        console.log(profileID);
    };

    // Loads data
    MainFactory.getData().success(function(result){
        $scope.profiles = result;
    });


    // Click Event: Inserts or updates profile
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

        MainFactory.insertNewProfile(newEntry).success(function(data, status, headers, config){
            // TODO: add spinner before calling factory?
            // TODO: success message?
            $scope.refresh();
        });

        // clears form
        $scope.entry = emptyForm;
    }

});






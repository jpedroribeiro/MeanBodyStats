'use strict';

module.exports = function(Profile){

    var serverCtrl = {

        /**
         * Read information from mongodb and populates app
         * @param req
         * @param res
         */
        retrieveData: function (req, res) {
            Profile.find(function (err, doc) {
                res.send(doc);
            });
        },


        /**
         * Updates existing profile or creates new one based on the request
         * @param req
         * @param res
         */
        updateProfile: function (req, res){
            // Reads input and 'stringifies' it
            var content = '';
            req.on("data",function(chunk){
                content = chunk.toString();
            });

            req.on("end",function(){
                var parsedContent = JSON.parse(content);
                Profile.findOne({ '_id': parsedContent['_id']}, function(err, resultProfile){
                    if( err ) {
                        console.log("Error found when trying to find profile: " + err );
                        return;
                    }
                    if ( !resultProfile ) {
                        console.log("Profile (_id) not found, creating one...");
                        var mongoose = require('mongoose');
                        // Generates mongoose style id for this new profile
                        parsedContent["_id"] = mongoose.Types.ObjectId();
                        resultProfile = new Profile(parsedContent);
                    }
                    /**
                     *  Entries are pushed as a whole set, in the future, TODO: find a way of updating single measurements in 'entries'
                     */
                    resultProfile.name = parsedContent['name'];
                    resultProfile.entries.push(parsedContent['entry']);
                    resultProfile.save( function ( err, resultProfile ){
                        if( err ) {
                            console.log("Error found when trying to save profile: " + err);
                            return;
                        }
                        res.status(200);
                        res.end();
                    });
                });
            });
        },

        /**
         * Removes (pulls) a single entry
         * @param req
         * @param res
         */
        removeEntry: function(req, res){
            // Reads input and 'stringifies' it
            var content = '';
            req.on("data",function(chunk){
                content = chunk.toString();
            });

            req.on("end",function(){
                var parsedContent = JSON.parse(content);
                Profile.findOneAndUpdate(
                    {'_id': parsedContent['_id']},
                    {$pull: {'entries': {'date': parsedContent['entryDate']}}},
                    function(err, resultProfile) {
                        console.log("Entry removed");
                        console.log(resultProfile);
                        res.status(200);
                        res.end();
                    }
                );
            });
        },

        /**
         * Deletes an entire profile from collection
         * @param req
         * @param res
         */
        removeProfile: function(req, res){
            // Reads input and 'stringifies' it
            var content = '';
            req.on("data",function(chunk){
                content = chunk.toString();
            });

            req.on("end", function(){
                var parsedContent = JSON.parse(content);
                Profile.findOneAndRemove({'_id': parsedContent['_id']}, function(err, resultProfile) {
                    console.log("Profile removed");
                    console.log(resultProfile);
                    res.status(200);
                    res.end();
                });
            });
        }

    };

    return serverCtrl;

};
'use strict';


module.exports = function(server, Profile){

    /**
     * Request app data from database
     */
    server.get('/load', function(req, res){
        Profile.find(function(err,doc){
            res.send(doc);
        });
    });


    /**
     * Saves or updates data
     */
    server.post('/save', function(req, res){

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
                 *  Updates (or sets) properties of the existing (or new) profile
                 *  Entries are pushed as a whole set, in the future, find a way of updating single measurements in 'entries' (TODO)
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
    });

    /**
     * Deletes a single entry from a profile
     */
    server.post('/rem_entry', function(req, res){
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
                    console.log("Removido");
                    console.log(resultProfile);
                    res.status(200);
                    res.end();
                }
            );
        });
    });

};
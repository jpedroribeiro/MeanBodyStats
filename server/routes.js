'use strict';

module.exports = function(server, Profile){
    server.get('/load', function(req, res){
        Profile.find(function(err,doc){
            res.send(doc);
        });
    });

    server.post('/save', function(req, res){
        var content = '';
        req.on("data",function(chunk){
            content = chunk.toString();
        });
        req.on("end",function(){
            var parsedContent = JSON.parse(content);
            Profile.findOne({ '_id': parsedContent['_id']}, function(err, resultProfile){
                if( err ) {
                    console.log("Error found: " + err );
                    return;
                }
                if ( !resultProfile ) {
                    console.log("Profile (_id) not found, creating one...");
                    var mongoose = require('mongoose');
                    parsedContent["_id"] = mongoose.Types.ObjectId();
                    resultProfile = new Profile(parsedContent);
                }
                resultProfile.name = parsedContent['name'];
                resultProfile.entries.push(parsedContent['entry']);
                resultProfile.save( function ( err, resultProfile ){
                    if( err ) {
                        console.log( err );
                        return;
                    }
                    res.status(200);
                    res.end();
                });
            });
        });
    });

};
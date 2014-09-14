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
            var newProfile = new Profile(parsedContent);
            //newProfile.save();
            //TODO: continue here, hardcoded an entry, try to test for existing user and update, new entry or new profile
            Profile.findOne({ '_id': '1'}, function(err, newProfile){
                newProfile.name = "hardcoding some stuff";
                newProfile.save( function ( err, newProfile ){
                    if( err ) console.log( err );

                    res.status(200);
                    res.end();
                });

            });
        });
    });

};
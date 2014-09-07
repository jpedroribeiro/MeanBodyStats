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
            var newProfile = new Profile(JSON.parse(content));
            newProfile.save();
            res.status(200);
            res.end();
        });
    });

};
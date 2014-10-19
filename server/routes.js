'use strict';


module.exports = function(server, serverCtrl){

    server.get('/load', function(req, res){
        serverCtrl.retrieveData(req, res);
    });

    server.post('/save', function(req, res){
        serverCtrl.updateProfile(req, res);
    });

    server.post('/rem_entry', function(req, res){
        serverCtrl.removeEntry(req, res);
    });

    server.post('/rem_profile', function(req, res){
        serverCtrl.removeProfile(req, res);
    });

};
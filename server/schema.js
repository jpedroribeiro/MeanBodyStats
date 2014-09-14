'use strict';

module.exports = function(server) {

    var mongoose = require("mongoose");
    mongoose.set('debug', true);
    // Connects to Mongo DB
    mongoose.connect('mongodb://localhost/bodystats');


    // Schema definition
    var profileSchema = {
        _id: String,
        name: String,
        entries: Array
    };

    return mongoose.model('Profile', profileSchema, 'profiles');

};
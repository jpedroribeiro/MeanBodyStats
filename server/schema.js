'use strict';

module.exports = function(server) {

    var mongoose = require("mongoose");

    // Connects to Mongo DB
    mongoose.connect('mongodb://localhost/bodystats');


    // Schema definition
    var profileSchema = {
        name: String,
        entries: Array
    };

    return mongoose.model('Profile', profileSchema, 'profiles');

};
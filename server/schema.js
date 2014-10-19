'use strict';

module.exports = function() {

    var mongoose = require("mongoose");

    // Logs to terminal
    //mongoose.set('debug', true);

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
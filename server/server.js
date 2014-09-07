// Initial sever setup
var express = require("express");
var server = express();


// Allows Cross-origin resource sharing
var cors = require("cors");
server.use(cors());


// MongoDB Connection & Schema
var modelSchema = require('./schema')(server);

// Routes
// Notation: requires routes.js sending the objects 'server' and 'Profile' as argument.
require('./routes')(server, modelSchema);


// Listen to port 3000
server.listen(3000);
// Initial sever setup
var express = require("express");
var server = express();


// Allows Cross-origin resource sharing
var cors = require("cors");
server.use(cors());


// MongoDB Connection & Schema
var modelSchema = require('./schema')();

// Load Controller
var serverCtrl = require('./controller')(modelSchema);

// Routes
// Notation: requires routes.js sending the objects 'server' and 'appCtrl' as argument.
require('./routes')(server, serverCtrl);


// Listen to port 3000
server.listen(3000);
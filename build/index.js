"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dgram_1 = require("dgram");
var server = dgram_1.createSocket('udp4');
var players = 0;
server.on('listening', function () {
    console.log("Silvio Santos is listening on port 5800.");
});
server.on('connect', function (message, rinfo) {
    players++;
    server.send('connected', rinfo.port, 'localhost', function (error) {
        if (error)
            throw error;
    });
});
server.bind(5800);

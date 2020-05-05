"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dgram_1 = require("dgram");
var prompt = require('prompt');
var host = '127.0.0.1';
var port = 5800;
var client = dgram_1.createSocket("udp4");
function play() {
    prompt.get(['answer'], function (err, result) {
        if (err) {
            return onErr(err);
        }
        if (result.answer === 'connect') {
            client.send('connect', port, host, function (message, info) {
                console.log('Attempting to connect with Silvio Santos...');
                console.log('player ', message);
            });
            client.on('connected', function (message, error) {
                console.log('message: ', message);
            });
        }
        if (result.resposta === 'exit') {
            console.log('Game over!');
        }
        else {
            client.send(result.answer, 0, result.answer.length, port, host, function (err, bytes) {
                if (err)
                    throw err;
            });
            play();
        }
    });
}
prompt.start();
play();
function onErr(err) {
    console.log(err);
    return 1;
}
/**let stop_condition = true;

while(stop_condition) {
    client.on('message', (messageContent, info) => {
        console.log(`Client recebeu a mensagem '${messageContent.toString()}' do servidor.`);
        client.close();
    });
}**/ 

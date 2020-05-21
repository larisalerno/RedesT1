import { createSocket, Socket } from 'dgram';
const prompt = require('prompt');

const host           :  string  = '127.0.0.1';
const port           :  number  =  5800;
const client         :  Socket  = createSocket("udp4");

let sent_messages : any[] = [];

let connection_message = { code: 'conn', ack: 0, message: '' };
let connected : Boolean = false;


/**
 * Statuses:
 * 0 : not sent
 * 1 : sent, no ack received
 * 2 : sent, ack received
 * 3 : sent, both sides received the message. stop sending this object.
 */

function sleep(s: number) {
    return new Promise( resolve => setTimeout(resolve, s * 1000));
}

function play() {
    prompt.get(['answer'], async (err, result) => {

        /**
         * Will stay here until ack 2 is reached.
         */

        if (err) { return onErr(err); }

        if(result.answer === 'connect') {

            console.log('Tentando comunicação com Silvio Santos...');
            await sleep(5);
            client.send(Buffer.from(JSON.stringify(connection_message)), port, host, (error, bytes) => {});
        }
            await sleep(2);

        if(result.answer === 'start') {
            console.log("Tudo certo, vamos começar!");

            let stat_game_message = { code: 'start', ack: 0, message: '' };

            client.send(Buffer.from(JSON.stringify(stat_game_message)), port, host, (error, bytes) => {});
        }

    });
}

prompt.start();

play();

client.on('message', async (message, rinfo) => {

    let received_message = JSON.parse(message.toString());

    if(received_message.code == 'conn' && received_message.ack == 1) { 
        console.log('Conectado!');
        play();
    }

    if(received_message.code == 'question') {
        console.log(`########### #############`);
        console.log(received_message);
    }

});

function onErr(err) {
    console.log(err);
    return 1;
}

client.bind(5801);
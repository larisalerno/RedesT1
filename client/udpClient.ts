import { createSocket, Socket } from 'dgram';
const prompt = require('prompt');

const host           :  string  = '127.0.0.1';
const port           :  number  =  5800;
const client         :  Socket  = createSocket("udp4");

let messages : any[] = [];

/**
 * Statuses:
 * 0 : not sent
 * 1 : sent, no ack received
 * 2 : sent, ack received
 */

function sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

function play() {
    prompt.get(['answer'], async (err, result) => {
        if (err) { return onErr(err); }

        if(result.answer === 'messages') {
            messages.map( (a, b) => {
                console.log('message: ', a);
            })
            play();
        }

        if(result.answer === 'connect') {
            let message = { code: 'connect', ack: 0, message: result.answer, status: 0 };
            messages.push(message);
            console.log('Trying to connect...');
            await sleep(5000);

            messages.map(async (value, index) => {
                while(value.code == 'connect' && value.ack == 0) {
                    await sleep(2000);
                    client.send(new Buffer(JSON.stringify(message)), port, host, (error) => {
                        console.log('Error: ', error);
                    });

                    await sleep(2000);
                    client.on('message', (message, info) => {
                        console.log(message);
                    })
                }
                console.log('Stopped trying to send message!');
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

client.bind(5801);
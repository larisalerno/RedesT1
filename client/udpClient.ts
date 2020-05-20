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



function play() {
    prompt.get(['answer'], async (err : any, result : any) => {
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
                    client.on('message', async (message, info) => {
                        console.log(message);
                        
                        let received_message = JSON.parse(message.toString());
                        while(received_message.ack == 1) {
                            await sleep(5000);

                            received_message.ack = 2;

                            client.send(new Buffer(JSON.stringify(received_message)), port, host, (error) => {
                                console.log('error: ', error);
                            });
                        }

                        messages.map((value, pos) => {
                            if(value.code === 'connect') {
                                messages.splice(pos, 1);
                            }
                        });
                    })
                }
                console.log('Stopped trying to send message!');
            });


            play();
        }

        if(result.answer === 'play') {
            let play_message = { code: 'play', ack: 0, message: result.answer, status: 0};
            messages.push(play_message);
        }

    });
}

prompt.start();

play();

function sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

function onErr(err : any) {
    console.log(err);
    return 1;
}

client.bind(5801);
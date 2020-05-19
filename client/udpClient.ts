import { createSocket, Socket } from 'dgram';
const prompt = require('prompt');

const host           :  string  = '127.0.0.1';
const port           :  number  =  5800;
const client         :  Socket  = createSocket("udp4");

function play() {
    prompt.get(['answer'], function (err : any, result : any) {
        if (err) { return onErr(err); }

        if(result.answer === 'connect') {
            client.send('connect', port, host, (message, info) => {
                console.log('Attempting to connect with server...');
            });
        }

        if(result.answer === 'exit') {
            console.log('Game over!');
        }else{
            client.send(result.answer, 0, result.answer.length, port, host, (err, bytes) => {
                if (err) throw err;
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
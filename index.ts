import { createSocket } from "dgram";

const host           :  string  = '127.0.0.1';
const port           :  number  =  5801;
const server = createSocket('udp4');

let players = 0;

let response_messages : any[] = []

function sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

server.on('listening', () => {
    console.log(`Silvio Santos is listening on port 5800.`);
});

server.on('message', async (message, rinfo) => {

    let received_message = JSON.parse(message.toString());

    console.log('received this: ', received_message);
    received_message.ack = 1;
    received_message.code = "connected";

    response_messages.push(received_message);

    response_messages.map( async (message, index) => {
        
        console.log('response message: ', message);
        while(message.ack == 1) {
            await sleep(6000);
            server.send(new Buffer(JSON.stringify(message)), port, host, (error) => {
                if(error) throw error;
            });
        }
    });  
});


server.bind(5800);

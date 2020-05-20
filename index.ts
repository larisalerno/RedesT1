import { createSocket, RemoteInfo } from "dgram";

const host           :  string  = '127.0.0.1';
const port           :  number  =  5801;
const server = createSocket('udp4');


let response_messages : any[] = []

function sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

server.on('listening', () => {
    console.log(`Silvio Santos is listening on port 5800.`);
});

server.on('message', async (message : Buffer, rinfo : RemoteInfo) => {

    let received_message = JSON.parse(message.toString());

    if (received_message.code == "connect") {
        response_messages.push(received_message);
        received_message.ack = 1;
        response_messages.map( async (message, index) => {
        
            console.log('response message: ', message);
            while(message.ack == 1 && message.code == 'connect') {
                await sleep(6000);
                server.send(new Buffer(JSON.stringify(message)), port, host, (error) => {
                    if(error) throw error;
                });
            }
        });  
    } else {
        console.log("message was different from connect: ", message);
    }

    


});


server.bind(5800);

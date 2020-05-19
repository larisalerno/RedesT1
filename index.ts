import { createSocket } from "dgram";

const server = createSocket('udp4');


server.on('listening', () => {
    console.log(`Silvio Santos is listening on port 5800.`);
});

server.on('connect', (message : any, rinfo : any) => {
    server.send('connected', rinfo.port, 'localhost', (error) => {
        if (error) throw error
    });
});

server.bind(5800);

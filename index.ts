import { createSocket } from "dgram";

const server = createSocket('udp4');

let players = 0;

server.on('listening', () => {
    console.log(`Silvio Santos is listening on port 5800.`);
});

server.on('connect', (message, rinfo) => {
    players++;
    server.send('connected', rinfo.port, 'localhost', (error) => {
        if (error) throw error
    })
})

server.bind(5800);

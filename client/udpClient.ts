import { createSocket, Socket, RemoteInfo } from 'dgram';
import { Message } from '../shared/interfaces/message.interface';
import { MessageCode } from '../shared/enums/message-code.enum';
import { AckStatus } from '../shared/enums/ack-status.enum';
import sleep from "../shared/auxiliar/sleep.aux";
import { Retries } from '../shared/enums/retries.enum';


const prompt = require('prompt');

const host    :  string  = '127.0.0.1';
const port    :  number  =  5800;
const client  :  Socket  = createSocket("udp4");

let current_message     : any     = {};
let current_question    : any     = {};
let received_question   : any     = {};
let connected           : boolean = false;

/**
 * Statuses:
 * 0 : not sent
 * 1 : sent, no ack received
 * 2 : sent, ack received
 */

function play() {
    prompt.get(['answer'], async (err : any, result : any) => {
        if (err) { return onErr(err); }

        if(result.answer === 'status') {
            await status();
        }

        if(result.answer === 'connect') {
            await connect();
        }

        if(result.start === 'start') {
            await start();
        }

        play();

    });
}

prompt.start();

play();

function onErr(err : any) {
    console.log(err);
    return 1;
}

client.on("message", async (message : Buffer, rinfo : RemoteInfo) => {
    let json_message : Message = JSON.parse(message.toString());

    if (json_message.code == MessageCode.CONNECT) {
        current_message = json_message;
    }

});


//  ################# MÉTODOS AUXILIARES ####################

async function status() {
    console.log('Está conectado? ', connected? 'Sim' : 'Não');
}

async function connect() {
    let retries = 0;

    // Constroi a mensagem
    let message : Message = { code: MessageCode.CONNECT, ack: AckStatus.SENT_NO_ACK };

    // Armazena a mensagem atual
    current_message = message;

    // Inicia a iteração para tentar estabelecer conexão. Máximo de tentativas: 3
    while(retries < Retries.CONNECT) {
        client.send(Buffer.from(JSON.stringify(message)), port, host, (error) => {
            if(error) throw error;
        });
            console.log(`Estabelecendo conexão...`);
            await sleep(4000);
            retries++;
            console.log(`Tentativa ${retries}`);
        if (current_message.code == MessageCode.CONNECT && current_message.ack == AckStatus.SENT_ACK_OK) {
            console.log('Conexão estabelecida!');
            connected = true;
            break;
        }
    }

    if(current_message.code == MessageCode.CONNECT && current_message.ack == AckStatus.SENT_NO_ACK) {
        console.log('Não foi possível estabelecer uma conexão.');
    }

}


/** Ainda não funcional! */
async function start() {
    
    if(!connected) {
        console.log('Não está conectado.');
    } else {

        let retries = 0;

        let message : Message = { code: MessageCode.GAME_STARTED, ack: AckStatus.SENT_NO_ACK };

        client.send(Buffer.from(JSON.stringify(message)), port, host, (error) => {
            if(error) throw error;
        });
        console.log(`Aguardando uma pergunta...`);
            await sleep(4000);
            retries++;
            console.log(`Tentativa ${retries}`);
        if (current_message.code == MessageCode.CONNECT && current_message.ack == AckStatus.SENT_ACK_OK) {
            console.log('Conexão estabelecida!');
            connected = true;
        }

    }
}

client.bind(5801);
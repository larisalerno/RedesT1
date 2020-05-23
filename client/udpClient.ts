import { createSocket, Socket, RemoteInfo } from 'dgram';
import { Message } from '../shared/interfaces/message.interface';
import { MessageCode } from '../shared/enums/message-code.enum';
import { AckStatus } from '../shared/enums/ack-status.enum';
import sleep from "../shared/auxiliar/sleep.aux";
import checkAlternative from "../shared/auxiliar/check-alternative.aux";
import { Retries } from '../shared/enums/retries.enum';


const prompt = require('prompt');

const host    :  string  = '127.0.0.1';
const port    :  number  =  5800;
const client  :  Socket  = createSocket("udp4");

let current_message     : any     = {};
let current_question    : any     = {};
let received_question   : any     = {};
let connected           : boolean = false;
let game_started        : boolean = false;

/**
 * Statuses:
 * 0 : not sent
 * 1 : sent, no ack received
 * 2 : sent, ack received
 */

function iterate() {
    prompt.get(['answer'], async (err : any, result : any) => {
        if (err) { return onErr(err); }

        if(result.answer === 'status') {
            await status();
        }

        if(result.answer === 'connect') {
            await connect();
        }

        if(result.answer === 'start') {
            await start();
        }

        if(result.answer === 'exit') {
            await exit();
        }

        if(checkAlternative(result.answer)) {
            await play(result.answer);
        }

        iterate();

    });
}

prompt.start();

iterate();

function onErr(err : any) {
    console.log(err);
    return 1;
}

client.on("message", async (message : Buffer, rinfo : RemoteInfo) => {
    let json_message : Message = JSON.parse(message.toString());

    if (json_message.code == MessageCode.CONNECT) {
        current_message = json_message;
    }

    if (json_message.code == MessageCode.GAME_STARTED) {
        current_message = json_message;
    }

    if (json_message.code == MessageCode.GAME_STARTED && json_message.ack == AckStatus.SENT_ACK_OK) {
        game_started == true;
    }

    if (json_message.code == MessageCode.QUESTION_RECEIVED) {
        current_question = json_message;
        console.log(current_question);
        console.log('Mensagem: ', json_message);
    }

});


//  ################# MÉTODOS AUXILIARES ####################

async function status() {
    console.log('Está conectado? ', connected? 'Sim' : 'Não');
}

async function connect() {

    if(connected) {
        console.log('Você já está conectado!\n\n');
        return;
    }

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

async function start() {
    
    let retries = 0;

    // Constroi a mensagem
    let message : Message = { code: MessageCode.GAME_STARTED, ack: AckStatus.SENT_NO_ACK };

    // Armazena a mensagem atual
    current_message = message;

    // Inicia a iteração para tentar estabelecer conexão. Máximo de tentativas: 3
    while(retries < Retries.GAME_START) {
        client.send(Buffer.from(JSON.stringify(message)), port, host, (error) => {
            if(error) throw error;
        });
            console.log(`Tentando iniciar o jogo... \n Tentativa ${retries}`);
            await sleep(4000);
            retries++;
        if (current_message.code == MessageCode.GAME_STARTED && current_message.ack == AckStatus.SENT_ACK_OK) {
            console.log('Jogo iniciado!');
            game_started = true;
            break;
        }
    }

    if(current_message.code == MessageCode.GAME_STARTED && current_message.ack == AckStatus.SENT_NO_ACK) {
        console.log('Não foi possível iniciar o jogo. Você precisa se conectar novamente.');
        connected = false;
        game_started = false;
        current_message = {};
    }
}

async function exit() {
    console.log('Até mais!');
    process.exit();
}


//TODO!
async function play(answer : any) {

    
}

client.bind(5801);
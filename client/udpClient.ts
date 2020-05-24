import { createSocket, Socket, RemoteInfo } from 'dgram';
import { Message }                          from '../shared/interfaces/message.interface';
import { MessageCode }                      from '../shared/enums/message-code.enum';
import { AckStatus }                        from '../shared/enums/ack-status.enum';
import sleep                                from "../shared/auxiliar/sleep.aux";
import checkAlternative                     from "../shared/auxiliar/check-alternative.aux";
import { Retries }                          from '../shared/enums/retries.enum';
import { win }                              from '../misc/youwin';

const prompt                       = require('prompt');

const host              :  string  = '127.0.0.1';
const port              :  number  =  5800;
const client            :  Socket  = createSocket("udp4");

let current_question    : Message;
let current_message     : any     = {};
let received_question   : any     = {};
let connected           : boolean = false;
let game_started        : boolean = false;
let has_shown_question  : boolean = false;
let keep_playing        : boolean = true;
let win_game            : boolean = false;
let current_money       : number  = 0;

/**
 * Statuses:
 * 0 : not sent
 * 1 : sent, no ack received
 * 2 : sent, ack received
 */

(() => {
    console.log(
        `################### MENU DE OPÇÕES ###################


        Para começar a jogar, digite os seguintes comandos:

        * connect   - Estabelece conexão com o servidor de jogo
        * start     - Inicia uma nova partida do Show do Milhão 
        
        
        Outros comandos úteis:

        * status    - Verifica o status da sua conexão com o servidor 
        * exit      - Finaliza a partida e encerra a conexão com o servidor
        `
    );
})();

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

        if(connected && game_started && !has_shown_question) {
            console.log('\n\nSua pergunta:', current_question.message!.question.description);
            let alternatives = '\n\n';
            current_question.message!.question.alternatives.forEach(alternative => alternatives += `${alternative}\n`)
            console.log('\nAs alternativas:', alternatives);
            console.log(`\nSeu premio até agora: R$ ${current_money} \n\n`)
            has_shown_question = true;
        }

        if(await checkAlternative(result.answer) && connected && game_started) {
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
        received_question   = current_question;
        current_question    = json_message;
        current_money       = json_message.message!.acc_money
    }

    if (json_message.code == MessageCode.GAME_OVER_RECEIVED) {
        keep_playing = false;
    }

    if (json_message.code == MessageCode.YOU_WIN) {
        keep_playing = false;
        win_game     = true;
        console.log('Você venceu!\n\n')

        console.log(win);
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

    console.log('Minha resposta é: ', answer);

    let check_answer_retries = 0;

    // Constroi a mensagem
    let answer_message : Message = { code: MessageCode.ANSWER_RECEIVED, ack: AckStatus.SENT_NO_ACK, message: answer};


    // Envia a mensagem com a resposta
    client.send(Buffer.from(JSON.stringify(answer_message)), port, host, (error) => {
        if(error) throw error;
    });

    // Aguarda a atualização da resposta.
    while(check_answer_retries < 5) {
        await sleep(5000);

        //Se resposta correta, segue jogando;
        if(keep_playing) {
            console.log('Certa resposta! Aguardando a próxima pergunta...');
            await sleep(10000);
            console.log('\n\nSua pergunta:', current_question.message!.question.description);
            let alternatives = '\n\n';
            current_question.message!.question.alternatives.forEach(alternative => alternatives += `${alternative}\n`)
            console.log('\nAs alternativas:', alternatives);
            console.log(`\nSeu premio até agora: R$ ${current_money} \n\n`)
            return;
        }
        //Se resposta errada, fim de jogo;
        if(!keep_playing && !win_game) {
            console.log('Você perdeu!')
            return;
        }
        check_answer_retries++;
    }

    console.log('Comunicação com o servidor perdida.');

}

client.bind(5801);
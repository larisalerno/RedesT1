import { createSocket, RemoteInfo } from "dgram";
import { Message } from "./shared/interfaces/message.interface";
import { MessageCode } from "./shared/enums/message-code.enum";
import { AckStatus } from "./shared/enums/ack-status.enum";
import generateQuestion from "./shared/auxiliar/generate-questions.aux";
import { Question } from "./shared/interfaces/question.interface";


let current_message             = {};
let questions_answered          = 0;
let monetary_score              = 0;
let current_question : Question = { description: '', alternatives: []};

(() => {
    const host              : string    = '127.0.0.1';
    const port              : number    =  5801;
    const response_messages : Message[] = [];
    const server                        = createSocket('udp4');
    
    server.on('listening', () => {
        console.log(`Silvio Santos is listening on port 5800.`);
    });
    
    server.on('message', async (message : Buffer, rinfo : RemoteInfo) => {
        
        const received_message : Message = JSON.parse(message.toString());
        

        if(received_message.code === MessageCode.CONNECT) {
            received_message.ack = AckStatus.SENT_ACK_OK;
            current_message = received_message;

            server.send(Buffer.from(JSON.stringify(received_message)), port, host, (error) => {
                if(error) throw error;
            });
        }
        
        if(received_message.code === MessageCode.GAME_STARTED) {

            const question       = await generateQuestion(questions_answered);
            current_question     = question;

            console.log('Pergunta atual: ', current_question);
            current_message      = received_message;
            received_message.ack = AckStatus.SENT_ACK_OK;
            
            //console.log('Sending to player: ', received_message);

            server.send(Buffer.from(JSON.stringify(received_message)), port, host, (error) => {
                if(error) throw error;
            });

            received_message.message = {
                question    : {description : question.description, alternatives: question.alternatives},
                acc_money   : monetary_score
            };
            received_message.code = MessageCode.QUESTION_RECEIVED;

            server.send(Buffer.from(JSON.stringify(received_message)), port, host, (error) => {
                if(error) throw error;
            });
        }

        if(received_message.code === MessageCode.ANSWER_RECEIVED) {
            let current_answer      = received_message;
            let chosen_alternative  = current_answer.message;
            console.log('chosen_alternative', chosen_alternative);
            console.log('current question', current_question);
            

            if(current_question.correctAnwserIndex == chosen_alternative) {
                //Keep playing
                console.log('Keep playing');

                questions_answered++;

                monetary_score += questions_answered <= 2 ? 50000 : 100000;

                //Se pontuacao == 11, o jogador acertou as 10 perguntas e ganhou o jogo.
                if(questions_answered == 11) {
                    received_message.code = MessageCode.YOU_WIN;
                    server.send(Buffer.from(JSON.stringify(received_message)), port, host, (error) => {
                        if(error) throw error;
                    });
                    clear();
                } 
                else {

                    let question     = await generateQuestion(questions_answered);
                    current_question = question;

                    received_message.message = {
                        question  : {description : question.description, alternatives: question.alternatives},
                        acc_money : monetary_score
                        
                    };
                    received_message.code    = MessageCode.QUESTION_RECEIVED;

                    server.send(Buffer.from(JSON.stringify(received_message)), port, host, (error) => {
                        if(error) throw error;
                    });
            }

            } 
            else {
                received_message.code = MessageCode.GAME_OVER_RECEIVED;
                server.send(Buffer.from(JSON.stringify(received_message)), port, host, (error) => {
                    if(error) throw error;
                });
                console.log('Encerrando partida...');
                clear();
            }

            console.log('user answered: ', current_answer);
        }
    });
    server.bind(5800);
})();

function clear() {
    current_message             = {};
    questions_answered          = 0;
    monetary_score              = 0;
    current_question            = { description: '', alternatives: []};
}

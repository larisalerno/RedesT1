import { createSocket, RemoteInfo } from "dgram";
import { Message } from "./shared/interfaces/message.interface";
import { MessageCode } from "./shared/enums/message-code.enum";
import { AckStatus } from "./shared/enums/ack-status.enum";
import generateQuestion from "./shared/auxiliar/generate-questions.aux";
import { Question } from "./shared/interfaces/question.interface";


let current_message = {};
let current_score   = 0;
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
        

        if(received_message.code == MessageCode.CONNECT) {
            received_message.ack = AckStatus.SENT_ACK_OK;
            current_message = received_message;

            server.send(Buffer.from(JSON.stringify(received_message)), port, host, (error) => {
                if(error) throw error;
            });
        }
        
        if(received_message.code == MessageCode.GAME_STARTED) {

            let question = await generateQuestion(current_score);
            current_question = question;


            console.log('Pergunta atual: ', current_question);
            current_message = received_message;
            received_message.ack = AckStatus.SENT_ACK_OK;
            
            //console.log('Sending to player: ', received_message);

            server.send(Buffer.from(JSON.stringify(received_message)), port, host, (error) => {
                if(error) throw error;
            });

            received_message.message = {description : question.description, alternatives: question.alternatives};
            received_message.code = MessageCode.QUESTION_RECEIVED;

            server.send(Buffer.from(JSON.stringify(received_message)), port, host, (error) => {
                if(error) throw error;
            });
        }

        if(received_message.code == MessageCode.ANSWER_RECEIVED) {
            let current_answer = received_message;
            let chosen_alternative = current_answer.message;
            console.log('chosen_alternative', chosen_alternative);
            console.log('current question', current_question);
            

            if(current_question.correctAnwserIndex == chosen_alternative) {
                //Keep playing
                console.log('Keep playing');

                current_score++;

                //Se pontuacao == 6, vitória e fim do jogo.
                let question = await generateQuestion(current_score);
                current_question = question;

                received_message.message = {description : question.description, alternatives: question.alternatives};
                received_message.code = MessageCode.QUESTION_RECEIVED;

                server.send(Buffer.from(JSON.stringify(received_message)), port, host, (error) => {
                    if(error) throw error;
                });

            } else {
                received_message.code = MessageCode.GAME_OVER_RECEIVED;
                server.send(Buffer.from(JSON.stringify(received_message)), port, host, (error) => {
                    if(error) throw error;
                });
                console.log('Encerrando partida...');
            }

            console.log('user answered: ', current_answer);
        }
    });
    
    
    server.bind(5800);
})();

import { createSocket, RemoteInfo } from "dgram";
import { Question } from "./shared/interfaces/question.interface";
import { Message } from "./shared/interfaces/message.interface";
import { MessageCode } from "./shared/enums/mssage-code.enum";
import { AckStatus } from "./shared/enums/ack-status.enum";

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
    
        if (received_message.code === MessageCode.CONNECT) {
            response_messages.push(received_message);
            received_message.ack = AckStatus.SENT_NO_ACK_RECEIVED;
            response_messages.map( async (message, index) => {
            
                console.log('response message: ', message);
                while(message.ack === AckStatus.SENT_NO_ACK_RECEIVED && message.code === MessageCode.CONNECT) {
                    await sleep(6000);
                    server.send(new Buffer(JSON.stringify(message)), port, host, (error) => {
                        if(error) throw error;
                    });
                }
            });  
        } 
        
        /**
         * @TODO Código que irá tratar a resposta do usuário para a pergunta
         */
        else if (received_message.code === MessageCode.ANSWER_RECEIVED) {
            console.log("received an answer from client: ", message);
        }

    });
    
    
    server.bind(5800);
})();

function generateQuestions() : Question[] {
    return [];
}

function sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
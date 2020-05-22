import { createSocket, RemoteInfo } from "dgram";
import { Question } from "./shared/interfaces/question.interface";
import { Message } from "./shared/interfaces/message.interface";
import { MessageCode } from "./shared/enums/message-code.enum";
import { AckStatus } from "./shared/enums/ack-status.enum";
import generateQuestions from "./shared/auxiliar/generate-questions.aux";
import sleep from "./shared/auxiliar/sleep.aux";

let current_message = {};

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
    
        

    });
    
    
    server.bind(5800);
})();

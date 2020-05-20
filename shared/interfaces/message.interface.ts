import { MessageCode } from "../enums/mssage-code.enum";
import { AckStatus } from '../enums/ack-status.enum';
import { Question } from "./question.interface";

export interface Message {
    code            : MessageCode,
    acknowledgement : AckStatus, // Talvez nao seja este enum aqui :)
    data            : Question | Question[], // os dados da mensagem serão somente para enviar/receber perguntas e respostas?
    status          : any // Talvez AckStatus seja aqui
}
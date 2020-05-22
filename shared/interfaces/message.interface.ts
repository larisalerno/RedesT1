import { MessageCode }  from "../enums/mssage-code.enum";
import { AckStatus }    from '../enums/ack-status.enum';
import { Question }     from "./question.interface";

export interface Message {
    code    : MessageCode,
    ack     : AckStatus,
    message : Question,
}
import { MessageCode }  from "../enums/message-code.enum";
import { AckStatus }    from '../enums/ack-status.enum';
import { Question }     from "./question.interface";
import { GameStatus } from './GameStatus.interface';

export interface Message {
    code     : MessageCode,
    ack      : AckStatus,
    message? : GameStatus,
}
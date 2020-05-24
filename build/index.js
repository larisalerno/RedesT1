"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dgram_1 = require("dgram");
var message_code_enum_1 = require("./shared/enums/message-code.enum");
var ack_status_enum_1 = require("./shared/enums/ack-status.enum");
var generate_questions_aux_1 = __importDefault(require("./shared/auxiliar/generate-questions.aux"));
var current_message = {};
var current_score = 0;
var current_question = { description: '', alternatives: [] };
(function () {
    var host = '127.0.0.1';
    var port = 5801;
    var response_messages = [];
    var server = dgram_1.createSocket('udp4');
    server.on('listening', function () {
        console.log("Silvio Santos is listening on port 5800.");
    });
    server.on('message', function (message, rinfo) { return __awaiter(void 0, void 0, void 0, function () {
        var received_message, question, current_answer, chosen_alternative, question;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    received_message = JSON.parse(message.toString());
                    if (received_message.code == message_code_enum_1.MessageCode.CONNECT) {
                        received_message.ack = ack_status_enum_1.AckStatus.SENT_ACK_OK;
                        current_message = received_message;
                        server.send(Buffer.from(JSON.stringify(received_message)), port, host, function (error) {
                            if (error)
                                throw error;
                        });
                    }
                    if (!(received_message.code == message_code_enum_1.MessageCode.GAME_STARTED)) return [3 /*break*/, 2];
                    return [4 /*yield*/, generate_questions_aux_1.default(current_score)];
                case 1:
                    question = _a.sent();
                    current_question = question;
                    console.log('Pergunta atual: ', current_question);
                    current_message = received_message;
                    received_message.ack = ack_status_enum_1.AckStatus.SENT_ACK_OK;
                    //console.log('Sending to player: ', received_message);
                    server.send(Buffer.from(JSON.stringify(received_message)), port, host, function (error) {
                        if (error)
                            throw error;
                    });
                    received_message.message = { description: question.description, alternatives: question.alternatives };
                    received_message.code = message_code_enum_1.MessageCode.QUESTION_RECEIVED;
                    server.send(Buffer.from(JSON.stringify(received_message)), port, host, function (error) {
                        if (error)
                            throw error;
                    });
                    _a.label = 2;
                case 2:
                    if (!(received_message.code == message_code_enum_1.MessageCode.ANSWER_RECEIVED)) return [3 /*break*/, 8];
                    current_answer = received_message;
                    chosen_alternative = current_answer.message;
                    console.log('chosen_alternative', chosen_alternative);
                    console.log('current question', current_question);
                    if (!(current_question.correctAnwserIndex == chosen_alternative)) return [3 /*break*/, 6];
                    //Keep playing
                    console.log('Keep playing');
                    current_score++;
                    if (!(current_score == 6)) return [3 /*break*/, 3];
                    received_message.code = message_code_enum_1.MessageCode.YOU_WIN;
                    server.send(Buffer.from(JSON.stringify(received_message)), port, host, function (error) {
                        if (error)
                            throw error;
                    });
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, generate_questions_aux_1.default(current_score)];
                case 4:
                    question = _a.sent();
                    current_question = question;
                    received_message.message = { description: question.description, alternatives: question.alternatives };
                    received_message.code = message_code_enum_1.MessageCode.QUESTION_RECEIVED;
                    server.send(Buffer.from(JSON.stringify(received_message)), port, host, function (error) {
                        if (error)
                            throw error;
                    });
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    received_message.code = message_code_enum_1.MessageCode.GAME_OVER_RECEIVED;
                    server.send(Buffer.from(JSON.stringify(received_message)), port, host, function (error) {
                        if (error)
                            throw error;
                    });
                    console.log('Encerrando partida...');
                    _a.label = 7;
                case 7:
                    console.log('user answered: ', current_answer);
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    }); });
    server.bind(5800);
})();

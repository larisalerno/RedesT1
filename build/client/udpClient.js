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
var message_code_enum_1 = require("../shared/enums/message-code.enum");
var ack_status_enum_1 = require("../shared/enums/ack-status.enum");
var sleep_aux_1 = __importDefault(require("../shared/auxiliar/sleep.aux"));
var check_alternative_aux_1 = __importDefault(require("../shared/auxiliar/check-alternative.aux"));
var retries_enum_1 = require("../shared/enums/retries.enum");
var prompt = require('prompt');
var host = '127.0.0.1';
var port = 5800;
var client = dgram_1.createSocket("udp4");
var current_message = {};
var current_question = {};
var received_question = {};
var connected = false;
var game_started = false;
/**
 * Statuses:
 * 0 : not sent
 * 1 : sent, no ack received
 * 2 : sent, ack received
 */
function iterate() {
    var _this = this;
    prompt.get(['answer'], function (err, result) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (err) {
                        return [2 /*return*/, onErr(err)];
                    }
                    if (!(result.answer === 'status')) return [3 /*break*/, 2];
                    return [4 /*yield*/, status()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(result.answer === 'connect')) return [3 /*break*/, 4];
                    return [4 /*yield*/, connect()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!(result.answer === 'start')) return [3 /*break*/, 6];
                    return [4 /*yield*/, start()];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    if (!(result.answer === 'exit')) return [3 /*break*/, 8];
                    return [4 /*yield*/, exit()];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    if (!check_alternative_aux_1.default(result.answer)) return [3 /*break*/, 10];
                    return [4 /*yield*/, play(result.answer)];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    iterate();
                    return [2 /*return*/];
            }
        });
    }); });
}
prompt.start();
iterate();
function onErr(err) {
    console.log(err);
    return 1;
}
client.on("message", function (message, rinfo) { return __awaiter(void 0, void 0, void 0, function () {
    var json_message;
    return __generator(this, function (_a) {
        json_message = JSON.parse(message.toString());
        if (json_message.code == message_code_enum_1.MessageCode.CONNECT) {
            current_message = json_message;
        }
        if (json_message.code == message_code_enum_1.MessageCode.GAME_STARTED) {
            current_message = json_message;
        }
        if (json_message.code == message_code_enum_1.MessageCode.GAME_STARTED && json_message.ack == ack_status_enum_1.AckStatus.SENT_ACK_OK) {
            game_started == true;
        }
        if (json_message.code == message_code_enum_1.MessageCode.QUESTION_RECEIVED) {
            current_question = json_message;
            console.log(current_question);
            console.log('Mensagem: ', json_message);
        }
        return [2 /*return*/];
    });
}); });
//  ################# MÉTODOS AUXILIARES ####################
function status() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('Está conectado? ', connected ? 'Sim' : 'Não');
            return [2 /*return*/];
        });
    });
}
function connect() {
    return __awaiter(this, void 0, void 0, function () {
        var retries, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (connected) {
                        console.log('Você já está conectado!\n\n');
                        return [2 /*return*/];
                    }
                    retries = 0;
                    message = { code: message_code_enum_1.MessageCode.CONNECT, ack: ack_status_enum_1.AckStatus.SENT_NO_ACK };
                    // Armazena a mensagem atual
                    current_message = message;
                    _a.label = 1;
                case 1:
                    if (!(retries < retries_enum_1.Retries.CONNECT)) return [3 /*break*/, 3];
                    client.send(Buffer.from(JSON.stringify(message)), port, host, function (error) {
                        if (error)
                            throw error;
                    });
                    console.log("Estabelecendo conex\u00E3o...");
                    return [4 /*yield*/, sleep_aux_1.default(4000)];
                case 2:
                    _a.sent();
                    retries++;
                    console.log("Tentativa " + retries);
                    if (current_message.code == message_code_enum_1.MessageCode.CONNECT && current_message.ack == ack_status_enum_1.AckStatus.SENT_ACK_OK) {
                        console.log('Conexão estabelecida!');
                        connected = true;
                        return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 1];
                case 3:
                    if (current_message.code == message_code_enum_1.MessageCode.CONNECT && current_message.ack == ack_status_enum_1.AckStatus.SENT_NO_ACK) {
                        console.log('Não foi possível estabelecer uma conexão.');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var retries, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    retries = 0;
                    message = { code: message_code_enum_1.MessageCode.GAME_STARTED, ack: ack_status_enum_1.AckStatus.SENT_NO_ACK };
                    // Armazena a mensagem atual
                    current_message = message;
                    _a.label = 1;
                case 1:
                    if (!(retries < retries_enum_1.Retries.GAME_START)) return [3 /*break*/, 3];
                    client.send(Buffer.from(JSON.stringify(message)), port, host, function (error) {
                        if (error)
                            throw error;
                    });
                    console.log("Tentando iniciar o jogo... \n Tentativa " + retries);
                    return [4 /*yield*/, sleep_aux_1.default(4000)];
                case 2:
                    _a.sent();
                    retries++;
                    if (current_message.code == message_code_enum_1.MessageCode.GAME_STARTED && current_message.ack == ack_status_enum_1.AckStatus.SENT_ACK_OK) {
                        console.log('Jogo iniciado!');
                        game_started = true;
                        return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 1];
                case 3:
                    if (current_message.code == message_code_enum_1.MessageCode.GAME_STARTED && current_message.ack == ack_status_enum_1.AckStatus.SENT_NO_ACK) {
                        console.log('Não foi possível iniciar o jogo. Você precisa se conectar novamente.');
                        connected = false;
                        game_started = false;
                        current_message = {};
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function exit() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('Até mais!');
            process.exit();
            return [2 /*return*/];
        });
    });
}
function play(answer) {
    return __awaiter(this, void 0, void 0, function () {
        var message;
        return __generator(this, function (_a) {
            if (game_started && connected) {
                console.log('Pergunta:\n\n', current_question);
            }
            message = { code: message_code_enum_1.MessageCode.ANSWER_RECEIVED, ack: ack_status_enum_1.AckStatus.SENT_NO_ACK, message: answer };
            if (game_started && connected) {
                client.send(Buffer.from(JSON.stringify(message)), port, host, function (error) {
                    if (error)
                        throw error;
                });
            }
            return [2 /*return*/];
        });
    });
}
client.bind(5801);

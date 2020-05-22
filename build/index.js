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
Object.defineProperty(exports, "__esModule", { value: true });
var dgram_1 = require("dgram");
var mssage_code_enum_1 = require("./shared/enums/mssage-code.enum");
var ack_status_enum_1 = require("./shared/enums/ack-status.enum");
(function () {
    var host = '127.0.0.1';
    var port = 5801;
    var response_messages = [];
    var server = dgram_1.createSocket('udp4');
    server.on('listening', function () {
        console.log("Silvio Santos is listening on port 5800.");
    });
    server.on('message', function (message, rinfo) { return __awaiter(void 0, void 0, void 0, function () {
        var received_message;
        return __generator(this, function (_a) {
            received_message = JSON.parse(message.toString());
            if (received_message.code === mssage_code_enum_1.MessageCode.CONNECT) {
                response_messages.push(received_message);
                received_message.ack = ack_status_enum_1.AckStatus.SENT_NO_ACK_RECEIVED;
                response_messages.map(function (message, index) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('response message: ', message);
                                _a.label = 1;
                            case 1:
                                if (!(message.ack === ack_status_enum_1.AckStatus.SENT_NO_ACK_RECEIVED && message.code === mssage_code_enum_1.MessageCode.CONNECT)) return [3 /*break*/, 3];
                                return [4 /*yield*/, sleep(6000)];
                            case 2:
                                _a.sent();
                                server.send(new Buffer(JSON.stringify(message)), port, host, function (error) {
                                    if (error)
                                        throw error;
                                });
                                return [3 /*break*/, 1];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
            /**
             * @TODO Código que irá tratar a resposta do usuário para a pergunta
             */
            else if (received_message.code === mssage_code_enum_1.MessageCode.ANSWER_RECEIVED) {
                console.log("received an answer from client: ", message);
            }
            return [2 /*return*/];
        });
    }); });
    server.bind(5800);
})();
function generateQuestions() {
    return [];
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}

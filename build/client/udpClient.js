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
var prompt = require('prompt');
var host = '127.0.0.1';
var port = 5800;
var client = dgram_1.createSocket("udp4");
var messages = [];
/**
 * Statuses:
 * 0 : not sent
 * 1 : sent, no ack received
 * 2 : sent, ack received
 */
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function play() {
    var _this = this;
    prompt.get(['answer'], function (err, result) { return __awaiter(_this, void 0, void 0, function () {
        var message_1, play_message;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (err) {
                        return [2 /*return*/, onErr(err)];
                    }
                    if (result.answer === 'messages') {
                        messages.map(function (a, b) {
                            console.log('message: ', a);
                        });
                        play();
                    }
                    if (!(result.answer === 'connect')) return [3 /*break*/, 2];
                    message_1 = { code: 'connect', ack: 0, message: result.answer, status: 0 };
                    messages.push(message_1);
                    console.log('Trying to connect...');
                    return [4 /*yield*/, sleep(5000)];
                case 1:
                    _a.sent();
                    messages.map(function (value, index) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(value.code == 'connect' && value.ack == 0)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, sleep(2000)];
                                case 1:
                                    _a.sent();
                                    client.send(new Buffer(JSON.stringify(message_1)), port, host, function (error) {
                                        console.log('Error: ', error);
                                    });
                                    return [4 /*yield*/, sleep(2000)];
                                case 2:
                                    _a.sent();
                                    client.on('message', function (message, info) { return __awaiter(_this, void 0, void 0, function () {
                                        var received_message;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    console.log(message);
                                                    received_message = JSON.parse(message.toString());
                                                    _a.label = 1;
                                                case 1:
                                                    if (!(received_message.ack == 1)) return [3 /*break*/, 3];
                                                    return [4 /*yield*/, sleep(5000)];
                                                case 2:
                                                    _a.sent();
                                                    received_message.ack = 2;
                                                    client.send(new Buffer(JSON.stringify(received_message)), port, host, function (error) {
                                                        console.log('error: ', error);
                                                    });
                                                    return [3 /*break*/, 1];
                                                case 3:
                                                    messages.map(function (value, pos) {
                                                        if (value.code === 'connect') {
                                                            messages.splice(pos, 1);
                                                        }
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [3 /*break*/, 0];
                                case 3:
                                    console.log('Stopped trying to send message!');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    play();
                    _a.label = 2;
                case 2:
                    if (result.answer === 'play') {
                        play_message = { code: 'play', ack: 0, message: result.answer, status: 0 };
                        messages.push(play_message);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
}
prompt.start();
play();
function onErr(err) {
    console.log(err);
    return 1;
}
client.bind(5801);

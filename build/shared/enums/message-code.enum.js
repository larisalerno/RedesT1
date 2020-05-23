"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageCode;
(function (MessageCode) {
    MessageCode[MessageCode["CONNECT"] = 0] = "CONNECT";
    MessageCode[MessageCode["QUESTION_RECEIVED"] = 1] = "QUESTION_RECEIVED";
    MessageCode[MessageCode["ANSWER_RECEIVED"] = 2] = "ANSWER_RECEIVED";
    MessageCode[MessageCode["GAME_OVER_RECEIVED"] = 3] = "GAME_OVER_RECEIVED";
    MessageCode[MessageCode["GAME_STARTED"] = 4] = "GAME_STARTED";
})(MessageCode = exports.MessageCode || (exports.MessageCode = {}));

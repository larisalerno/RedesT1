"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Retries;
(function (Retries) {
    Retries[Retries["CONNECT"] = 3] = "CONNECT";
    Retries[Retries["SEND_ANSWER"] = 3] = "SEND_ANSWER";
    Retries[Retries["GAME_START"] = 5] = "GAME_START";
})(Retries = exports.Retries || (exports.Retries = {}));

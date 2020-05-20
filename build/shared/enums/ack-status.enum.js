"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AckStatus = void 0;
var AckStatus;
(function (AckStatus) {
    AckStatus[AckStatus["NOT_SENT"] = 0] = "NOT_SENT";
    AckStatus[AckStatus["SENT_NO_ACK_RECEIVED"] = 1] = "SENT_NO_ACK_RECEIVED";
    AckStatus[AckStatus["SENT_ACK_RECEIVED"] = 2] = "SENT_ACK_RECEIVED";
})(AckStatus = exports.AckStatus || (exports.AckStatus = {}));

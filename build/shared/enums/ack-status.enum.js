"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AckStatus;
(function (AckStatus) {
    AckStatus[AckStatus["NOT_SENT"] = 0] = "NOT_SENT";
    AckStatus[AckStatus["SENT_NO_ACK_RECEIVED"] = 1] = "SENT_NO_ACK_RECEIVED";
    AckStatus[AckStatus["SENT_ACK_RECEIVED"] = 2] = "SENT_ACK_RECEIVED";
    AckStatus[AckStatus["ACK_FULL_RECEIVED"] = 3] = "ACK_FULL_RECEIVED";
})(AckStatus = exports.AckStatus || (exports.AckStatus = {}));

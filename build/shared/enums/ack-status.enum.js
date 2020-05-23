"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AckStatus;
(function (AckStatus) {
    AckStatus[AckStatus["SENT_NO_ACK"] = 0] = "SENT_NO_ACK";
    AckStatus[AckStatus["SENT_ACK_OK"] = 1] = "SENT_ACK_OK";
    AckStatus[AckStatus["ACK_FULL_RECEIVED"] = 2] = "ACK_FULL_RECEIVED";
})(AckStatus = exports.AckStatus || (exports.AckStatus = {}));

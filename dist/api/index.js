"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemJobApiEnum = exports.VerifyBotApiEnum = exports.PrizeDrawApiEnum = void 0;
var PrizeDrawApiEnum;
(function (PrizeDrawApiEnum) {
    PrizeDrawApiEnum["createRule"] = "createRule";
    PrizeDrawApiEnum["findAllRule"] = "findAllRule";
    PrizeDrawApiEnum["findOneRule"] = "findOneRule";
    PrizeDrawApiEnum["updateRule"] = "updateRule";
    PrizeDrawApiEnum["removeRule"] = "removeRule";
    PrizeDrawApiEnum["createGroup"] = "createGroup";
    PrizeDrawApiEnum["findAllGroup"] = "findAllGroup";
    PrizeDrawApiEnum["findOneGroup"] = "findOneGroup";
    PrizeDrawApiEnum["updateGroup"] = "updateGroup";
    PrizeDrawApiEnum["removeGroup"] = "removeGroup";
})(PrizeDrawApiEnum || (exports.PrizeDrawApiEnum = PrizeDrawApiEnum = {}));
var VerifyBotApiEnum;
(function (VerifyBotApiEnum) {
    VerifyBotApiEnum["createWhiteList"] = "createWhiteList";
    VerifyBotApiEnum["findAllWhiteList"] = "findAllWhiteList";
    VerifyBotApiEnum["removeWhiteList"] = "removeWhiteList";
})(VerifyBotApiEnum || (exports.VerifyBotApiEnum = VerifyBotApiEnum = {}));
var SystemJobApiEnum;
(function (SystemJobApiEnum) {
    SystemJobApiEnum["getJobList"] = "getJobList";
    SystemJobApiEnum["getJob"] = "getJob";
    SystemJobApiEnum["createJob"] = "createJob";
    SystemJobApiEnum["updateJob"] = "updateJob";
    SystemJobApiEnum["removeJob"] = "removeJob";
    SystemJobApiEnum["changeJobStatus"] = "changeJobStatus";
    SystemJobApiEnum["runJob"] = "runJob";
})(SystemJobApiEnum || (exports.SystemJobApiEnum = SystemJobApiEnum = {}));
//# sourceMappingURL=index.js.map
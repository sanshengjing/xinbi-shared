"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectMicroservice = InjectMicroservice;
const common_1 = require("@nestjs/common");
function InjectMicroservice(serviceName) {
    return (0, common_1.Inject)(serviceName);
}
//# sourceMappingURL=inject-microservice.decorator.js.map
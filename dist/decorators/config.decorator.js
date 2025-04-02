"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectConfig = InjectConfig;
exports.ConfigValue = ConfigValue;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
function InjectConfig() {
    return (0, common_1.Inject)(config_1.ConfigService);
}
function ConfigValue(key, defaultValue) {
    return function (target, propertyKey) {
        let value;
        let configService;
        Object.defineProperty(target, propertyKey, {
            get() {
                if (!configService) {
                    configService = this.configService;
                }
                if (configService && value === undefined) {
                    value = configService.get(key, defaultValue);
                }
                console.log('value', value);
                return value;
            },
            enumerable: true,
            configurable: true
        });
        InjectConfig()(target, 'configService');
    };
}
//# sourceMappingURL=config.decorator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotTemplateBuilder = void 0;
class BotTemplateBuilder {
    constructor() {
        this.lines = [];
    }
    add(line = '') {
        this.lines.push(line);
        return this;
    }
    addIf(condition, line) {
        if (condition) {
            this.lines.push(line);
        }
        return this;
    }
    build() {
        return this.lines.join('');
    }
}
exports.BotTemplateBuilder = BotTemplateBuilder;
//# sourceMappingURL=bot.service.js.map
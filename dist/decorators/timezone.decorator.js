"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimezoneOffset = void 0;
const common_1 = require("@nestjs/common");
exports.TimezoneOffset = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const headerOffset = request.headers['x-timezone-offset'];
    if (headerOffset) {
        const offset = parseInt(headerOffset, 10);
        if (!isNaN(offset)) {
            return offset;
        }
    }
    return 7 * 60 * 60 * 1000;
});
//# sourceMappingURL=timezone.decorator.js.map
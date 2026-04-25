"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeLimitMiddleware = void 0;
const common_1 = require("@nestjs/common");
let SizeLimitMiddleware = class SizeLimitMiddleware {
    use(req, res, next) {
        if (req.headers['content-length'] > 104857600) {
            return res.status(413).send('Payload too large');
        }
        next();
    }
};
exports.SizeLimitMiddleware = SizeLimitMiddleware;
exports.SizeLimitMiddleware = SizeLimitMiddleware = __decorate([
    (0, common_1.Injectable)()
], SizeLimitMiddleware);
//# sourceMappingURL=size-limit-middleware.js.map
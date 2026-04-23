"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotaHeadersInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
function setHdr(reply, name, value) {
    if (value === undefined || value === null)
        return;
    reply.header(name, String(value));
}
function exposeRateHdrs(reply) {
    setHdr(reply, 'Access-Control-Expose-Headers', 'X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset');
}
let QuotaHeadersInterceptor = class QuotaHeadersInterceptor {
    intercept(ctx, next) {
        const reply = ctx.switchToHttp().getResponse();
        const req = ctx.switchToHttp().getRequest();
        const applyHeaders = () => {
            const q = req.quota;
            if (!q)
                return;
            exposeRateHdrs(reply);
            if (q.allowed) {
                if (q.remaining != null)
                    setHdr(reply, 'X-RateLimit-Remaining', q.remaining);
                if (q.resetAt != null)
                    setHdr(reply, 'X-RateLimit-Reset', q.resetAt);
            }
            else {
                setHdr(reply, 'X-RateLimit-Remaining', '0');
                if (q.resetAt != null)
                    setHdr(reply, 'X-RateLimit-Reset', q.resetAt);
            }
        };
        const handleError = (error) => {
            applyHeaders();
            const q = req.quota;
            if (q && !q.allowed) {
                throw new common_1.BadRequestException({ reason: q.reason || error.message });
            }
            throw error;
        };
        const q = req.quota;
        if (q && !q.allowed) {
            applyHeaders();
            return (0, rxjs_1.throwError)(() => new common_1.BadRequestException({ reason: req.quota.reason }));
        }
        return next.handle().pipe((0, rxjs_1.tap)({ next: applyHeaders, error: applyHeaders }));
    }
};
exports.QuotaHeadersInterceptor = QuotaHeadersInterceptor;
exports.QuotaHeadersInterceptor = QuotaHeadersInterceptor = __decorate([
    (0, common_1.Injectable)()
], QuotaHeadersInterceptor);
//# sourceMappingURL=quota-headers.interceptor.js.map
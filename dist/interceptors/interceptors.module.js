"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterceptorModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const customer_interceptor_1 = require("./customer.interceptor");
const tenant_subscription_usage_module_1 = require("../module/core/tenant-subscription-usage/tenant-subscription-usage.module");
let InterceptorModule = class InterceptorModule {
};
exports.InterceptorModule = InterceptorModule;
exports.InterceptorModule = InterceptorModule = __decorate([
    (0, common_1.Module)({
        imports: [tenant_subscription_usage_module_1.TenantSubscriptionUsageModule],
        providers: [
            { provide: core_1.APP_INTERCEPTOR, useClass: customer_interceptor_1.CustomInterceptor },
        ],
        exports: [],
    })
], InterceptorModule);
//# sourceMappingURL=interceptors.module.js.map
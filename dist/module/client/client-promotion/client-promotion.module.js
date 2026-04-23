"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPromotionModule = void 0;
const promotion_schema_1 = require("../../core/promotion/schema/promotion.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const client_promotion_service_1 = require("./client-promotion-service");
const client_promotion_controller_1 = require("./client-promotion.controller");
const promotion_module_1 = require("../../core/promotion/promotion.module");
const tenant_subscription_usage_module_1 = require("../../core/tenant-subscription-usage/tenant-subscription-usage.module");
let ClientPromotionModule = class ClientPromotionModule {
};
exports.ClientPromotionModule = ClientPromotionModule;
exports.ClientPromotionModule = ClientPromotionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: promotion_schema_1.PromotionDocument.name, schema: promotion_schema_1.PromotionSchema }]),
            (0, common_1.forwardRef)(() => promotion_module_1.PromotionModule),
            (0, common_1.forwardRef)(() => tenant_subscription_usage_module_1.TenantSubscriptionUsageModule),
        ],
        providers: [client_promotion_service_1.ClientPromotionService],
        controllers: [client_promotion_controller_1.ClientPromotionController],
        exports: [client_promotion_service_1.ClientPromotionService],
    })
], ClientPromotionModule);
//# sourceMappingURL=client-promotion.module.js.map
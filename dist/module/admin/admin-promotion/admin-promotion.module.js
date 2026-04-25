"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPromotionModule = void 0;
const promotion_schema_1 = require("../../core/promotion/schema/promotion.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_promotion_service_1 = require("./admin-promotion-service");
const admin_promotion_controller_1 = require("./admin-promotion.controller");
const promotion_module_1 = require("../../core/promotion/promotion.module");
const tenant_subscription_usage_module_1 = require("../../core/tenant-subscription-usage/tenant-subscription-usage.module");
let AdminPromotionModule = class AdminPromotionModule {
};
exports.AdminPromotionModule = AdminPromotionModule;
exports.AdminPromotionModule = AdminPromotionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: promotion_schema_1.PromotionDocument.name, schema: promotion_schema_1.PromotionSchema }]),
            (0, common_1.forwardRef)(() => promotion_module_1.PromotionModule),
            (0, common_1.forwardRef)(() => tenant_subscription_usage_module_1.TenantSubscriptionUsageModule),
        ],
        providers: [admin_promotion_service_1.AdminPromotionService],
        controllers: [admin_promotion_controller_1.AdminPromotionController],
        exports: [admin_promotion_service_1.AdminPromotionService],
    })
], AdminPromotionModule);
//# sourceMappingURL=admin-promotion.module.js.map
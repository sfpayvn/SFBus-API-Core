"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPromotionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const promotion_schema_1 = require("../../core/promotion/schema/promotion.schema");
const promotion_service_1 = require("../../core/promotion/promotion-service");
let ClientPromotionService = class ClientPromotionService {
    constructor(promotionModel, promotionService) {
        this.promotionModel = promotionModel;
        this.promotionService = promotionService;
    }
    async redeem(ClientRedeemPromotionDto, tenantId) {
        return this.promotionService.redeem(ClientRedeemPromotionDto, tenantId);
    }
    async findAll(tenantIds) {
        return this.promotionService.findAll(tenantIds);
    }
    async findOne(id, tenantId) {
        return this.promotionService.findOne(id, tenantId);
    }
    async findAllByRule(userId, bookingIds, tenantId) {
        return this.promotionService.findAllByRule(userId, bookingIds, tenantId);
    }
    async findMassPromotion(tenantId) {
        return this.promotionService.findMassPromotion(tenantId);
    }
};
exports.ClientPromotionService = ClientPromotionService;
exports.ClientPromotionService = ClientPromotionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(promotion_schema_1.PromotionDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => promotion_service_1.PromotionService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        promotion_service_1.PromotionService])
], ClientPromotionService);
//# sourceMappingURL=client-promotion-service.js.map
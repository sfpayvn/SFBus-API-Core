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
exports.PosPromotionController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../jwt/dto/user-token.dto");
const roles_guard_1 = require("../../../guards/roles.guard");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const pos_promotion_service_1 = require("./pos-promotion-service");
const pos_promotion_dto_1 = require("./dto/pos-promotion.dto");
const tenant_scope_1 = require("../../../common/tenant/tenant-scope");
const mark_default_tenant_1 = require("../../../interceptors/mark-default-tenant");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let PosPromotionController = class PosPromotionController {
    constructor(PosPromotionService) {
        this.PosPromotionService = PosPromotionService;
    }
    redeem(PosRedeemPromotionDto, user) {
        const { tenantId } = user;
        return this.PosPromotionService.redeem(PosRedeemPromotionDto, tenantId);
    }
    findAll(tenantScope) {
        const { tenantIds } = tenantScope;
        return this.PosPromotionService.findAll(tenantIds);
    }
    findOne(id, user) {
        const { tenantId } = user;
        return this.PosPromotionService.findOne(id, tenantId);
    }
    findAllByRule(query, user) {
        const { userId, bookingIds } = query;
        const { tenantId } = user;
        return this.PosPromotionService.findAllByRule(userId, bookingIds, tenantId);
    }
    findMassPromotion(query, user) {
        const { tenantId } = user;
        return this.PosPromotionService.findMassPromotion(tenantId);
    }
};
exports.PosPromotionController = PosPromotionController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)('redeem'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_promotion_dto_1.PosRedeemPromotionDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosPromotionController.prototype, "redeem", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.UseInterceptors)((0, mark_default_tenant_1.MarkDefaultTenant)()),
    (0, common_1.Get)(),
    __param(0, (0, tenant_scope_1.TenantScope)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosPromotionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosPromotionController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)('find-all-by-rule'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_promotion_dto_1.PosRequestPromotionByRule,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosPromotionController.prototype, "findAllByRule", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)('find-mass-promotion'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pos_promotion_dto_1.PosRequestPromotionMass,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], PosPromotionController.prototype, "findMassPromotion", null);
exports.PosPromotionController = PosPromotionController = __decorate([
    (0, common_1.Controller)('pos/promotion'),
    __metadata("design:paramtypes", [pos_promotion_service_1.PosPromotionService])
], PosPromotionController);
//# sourceMappingURL=pos-promotion.controller.js.map
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
exports.FeeTaxController = void 0;
const common_1 = require("@nestjs/common");
const fee_tax_service_1 = require("./fee-tax.service");
const fee_tax_dto_1 = require("./dto/fee-tax.dto");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../jwt/dto/user-token.dto");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let FeeTaxController = class FeeTaxController {
    constructor(feeTaxService) {
        this.feeTaxService = feeTaxService;
    }
    async create(createDto, user) {
        return this.feeTaxService.create(user.tenantId.toString(), createDto, user._id.toString());
    }
    async getAll(user, enabled) {
        const enabledBool = enabled !== undefined ? enabled === 'true' : undefined;
        return this.feeTaxService.findByTenant(user.tenantId.toString(), enabledBool);
    }
    async getById(id, user) {
        return this.feeTaxService.findById(id, user.tenantId.toString());
    }
    async update(id, updateDto, user) {
        return this.feeTaxService.update(id, user.tenantId.toString(), updateDto, user._id.toString());
    }
    async delete(id, user) {
        await this.feeTaxService.delete(id, user.tenantId.toString());
        return { message: 'Fee/Tax deleted successfully' };
    }
    async getApplicable(user, total, ticketCount, routeId, feeType) {
        return this.feeTaxService.getApplicableFeesTaxes(user.tenantId.toString(), {
            total: total || 0,
            ticketCount: ticketCount || 0,
            routeId,
            feeType,
        });
    }
};
exports.FeeTaxController = FeeTaxController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fee_tax_dto_1.CreateFeeTaxDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], FeeTaxController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('enabled')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto, String]),
    __metadata("design:returntype", Promise)
], FeeTaxController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], FeeTaxController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, fee_tax_dto_1.UpdateFeeTaxDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], FeeTaxController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], FeeTaxController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('calculate/preview'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('total')),
    __param(2, (0, common_1.Query)('ticketCount')),
    __param(3, (0, common_1.Query)('routeId')),
    __param(4, (0, common_1.Query)('feeType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], FeeTaxController.prototype, "getApplicable", null);
exports.FeeTaxController = FeeTaxController = __decorate([
    (0, common_1.Controller)('fee-taxes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT),
    __metadata("design:paramtypes", [fee_tax_service_1.FeeTaxService])
], FeeTaxController);
//# sourceMappingURL=fee-tax.controller.js.map
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
exports.AdminFeeTaxController = void 0;
const common_1 = require("@nestjs/common");
const admin_fee_tax_service_1 = require("./admin-fee-tax-service");
const admin_fee_tax_dto_1 = require("./dto/admin-fee-tax.dto");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../jwt/dto/user-token.dto");
const roles_constants_1 = require("../../../common/constants/roles.constants");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
let AdminFeeTaxController = class AdminFeeTaxController {
    constructor(adminFeeTaxService) {
        this.adminFeeTaxService = adminFeeTaxService;
    }
    async getApplicable(user, total, ticketCount, routeId, feeType) {
        return this.adminFeeTaxService.getApplicableFeesTaxes(user.tenantId, {
            total: total || 0,
            ticketCount: ticketCount || 0,
            routeId,
            feeType,
        });
    }
    async calculateFeesAndTaxes(params, user) {
        return this.adminFeeTaxService.calculateFeesAndTaxes(user.tenantId, params);
    }
    async searchFeeTaxPaging(query, user) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'priority',
            value: 'ascend',
        }, filters = [], } = query;
        const { tenantId } = user;
        return this.adminFeeTaxService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
    }
    async create(createDto, user) {
        return this.adminFeeTaxService.create(user.tenantId, createDto, user._id);
    }
    async getAll(user, enabled) {
        const enabledBool = enabled !== undefined ? enabled === 'true' : undefined;
        return this.adminFeeTaxService.findByTenant(user.tenantId, enabledBool);
    }
    async getById(id, user) {
        return this.adminFeeTaxService.findById(id, user.tenantId);
    }
    async update(id, updateDto, user) {
        return this.adminFeeTaxService.update(id, user.tenantId, updateDto, user._id);
    }
    async delete(id, user) {
        await this.adminFeeTaxService.delete(id, user.tenantId);
        return { message: 'Fee/Tax deleted successfully' };
    }
};
exports.AdminFeeTaxController = AdminFeeTaxController;
__decorate([
    (0, common_1.Get)('calculate/preview'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Query)('total')),
    __param(2, (0, common_1.Query)('ticketCount')),
    __param(3, (0, common_1.Query)('routeId')),
    __param(4, (0, common_1.Query)('feeType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], AdminFeeTaxController.prototype, "getApplicable", null);
__decorate([
    (0, common_1.Post)('calculate'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminFeeTaxController.prototype, "calculateFeesAndTaxes", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_fee_tax_dto_1.AdminSearchFeeTaxPagingQuery,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminFeeTaxController.prototype, "searchFeeTaxPaging", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_fee_tax_dto_1.CreateFeeTaxDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminFeeTaxController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Query)('enabled')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto, String]),
    __metadata("design:returntype", Promise)
], AdminFeeTaxController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminFeeTaxController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, admin_fee_tax_dto_1.UpdateFeeTaxDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminFeeTaxController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], AdminFeeTaxController.prototype, "delete", null);
exports.AdminFeeTaxController = AdminFeeTaxController = __decorate([
    (0, common_1.Controller)('admin/fee-taxes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT),
    __metadata("design:paramtypes", [admin_fee_tax_service_1.AdminFeeTaxService])
], AdminFeeTaxController);
//# sourceMappingURL=admin-fee-tax.controller.js.map
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
exports.PosPaymentMethodController = void 0;
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const common_1 = require("@nestjs/common");
const pos_payment_method_service_1 = require("./pos-payment-method-service");
const tenant_scope_1 = require("../../../common/tenant/tenant-scope");
const mark_default_tenant_1 = require("../../../interceptors/mark-default-tenant");
const mongoose_1 = require("mongoose");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let PosPaymentMethodController = class PosPaymentMethodController {
    constructor(posPaymentMethodService) {
        this.posPaymentMethodService = posPaymentMethodService;
    }
    findOne(id, tenantScope) {
        const { tenantIds } = tenantScope;
        return this.posPaymentMethodService.findOne(id, tenantIds);
    }
    findAll(tenantScope) {
        const { tenantIds } = tenantScope;
        return this.posPaymentMethodService.findAll(tenantIds);
    }
    async findDefault(tenantScope) {
        const { tenantIds } = tenantScope;
        return this.posPaymentMethodService.findDefault(tenantIds);
    }
};
exports.PosPaymentMethodController = PosPaymentMethodController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.UseInterceptors)((0, mark_default_tenant_1.MarkDefaultTenant)()),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, tenant_scope_1.TenantScope)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object]),
    __metadata("design:returntype", void 0)
], PosPaymentMethodController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.UseInterceptors)((0, mark_default_tenant_1.MarkDefaultTenant)()),
    (0, common_1.Get)(),
    __param(0, (0, tenant_scope_1.TenantScope)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PosPaymentMethodController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.UseInterceptors)((0, mark_default_tenant_1.MarkDefaultTenant)()),
    (0, common_1.Get)('default'),
    __param(0, (0, tenant_scope_1.TenantScope)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PosPaymentMethodController.prototype, "findDefault", null);
exports.PosPaymentMethodController = PosPaymentMethodController = __decorate([
    (0, common_1.Controller)('pos/payment-method'),
    __metadata("design:paramtypes", [pos_payment_method_service_1.PosPaymentMethodService])
], PosPaymentMethodController);
//# sourceMappingURL=pos-payment-method.controller.js.map
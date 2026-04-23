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
exports.TenantSubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const tenant_subscription_service_1 = require("./tenant-subscription.service");
const mongoose_1 = require("mongoose");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const user_token_dto_1 = require("../../../jwt/dto/user-token.dto");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const tenant_subscription_dto_1 = require("./dto/tenant-subscription.dto");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let TenantSubscriptionController = class TenantSubscriptionController {
    constructor(svc) {
        this.svc = svc;
    }
    register(dto, user) {
        const tenantId = new mongoose_1.Types.ObjectId(user.tenantId);
        return this.svc.registerForTenant(tenantId, dto);
    }
};
exports.TenantSubscriptionController = TenantSubscriptionController;
__decorate([
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tenant_subscription_dto_1.RegisterSubscriptionDto, user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", void 0)
], TenantSubscriptionController.prototype, "register", null);
exports.TenantSubscriptionController = TenantSubscriptionController = __decorate([
    (0, common_1.Controller)('tenant-subscription'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [tenant_subscription_service_1.TenantSubscriptionService])
], TenantSubscriptionController);
//# sourceMappingURL=tenant-subscription.controller.js.map
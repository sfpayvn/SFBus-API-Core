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
exports.AdminAuthRescueController = void 0;
const common_1 = require("@nestjs/common");
const admin_auth_rescue_service_1 = require("./admin-auth-rescue.service");
const admin_auth_rescue_dto_1 = require("./dto/admin-auth-rescue.dto");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../../guards/roles.guard");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let AdminAuthRescueController = class AdminAuthRescueController {
    constructor(adminAuthRescueService) {
        this.adminAuthRescueService = adminAuthRescueService;
    }
    async request(user, adminRequestAuthRescueDto) {
        const { tenantId } = user;
        const res = await this.adminAuthRescueService.requestAuthRescue(adminRequestAuthRescueDto.identifier, adminRequestAuthRescueDto.purpose, tenantId);
        return res;
    }
    async verify(user, adminVerifyAuthRescueDto) {
        const { _id, tenantId } = user;
        return this.adminAuthRescueService.verifyAuthRescue(adminVerifyAuthRescueDto.identifier, adminVerifyAuthRescueDto.purpose, adminVerifyAuthRescueDto.token, _id, tenantId);
    }
};
exports.AdminAuthRescueController = AdminAuthRescueController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('request'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto,
        admin_auth_rescue_dto_1.AdminRequestAuthRescueDto]),
    __metadata("design:returntype", Promise)
], AdminAuthRescueController.prototype, "request", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR),
    (0, common_1.Post)('verify'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto,
        admin_auth_rescue_dto_1.AdminVerifyAuthRescueDto]),
    __metadata("design:returntype", Promise)
], AdminAuthRescueController.prototype, "verify", null);
exports.AdminAuthRescueController = AdminAuthRescueController = __decorate([
    (0, common_1.Controller)('admin/auth/rescue'),
    __metadata("design:paramtypes", [admin_auth_rescue_service_1.AdminAuthRescueService])
], AdminAuthRescueController);
//# sourceMappingURL=admin-auth-rescue.controller.js.map
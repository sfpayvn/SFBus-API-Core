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
exports.DriverUserController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../../decorators/current-user.decorator");
const user_token_dto_1 = require("../../../../jwt/dto/user-token.dto");
const driver_user_service_1 = require("./driver-user.service");
const jwt_auth_guard_1 = require("../../../../guards/jwt-auth.guard");
const parse_objectId_pipe_1 = require("../../../../common/pipes/parse-objectId.pipe");
const strip_fields_interceptor_1 = require("../../../../interceptors/strip-fields.interceptor");
const driver_user_dto_1 = require("./dto/driver-user.dto");
const roles_decorator_1 = require("../../../../decorators/roles.decorator");
const roles_guard_1 = require("../../../../guards/roles.guard");
const driver_update_user_dto_1 = require("./dto/driver-update-user.dto");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let DriverUserController = class DriverUserController {
    constructor(driverUserService) {
        this.driverUserService = driverUserService;
    }
    async updateProfile(user, driverUpdateUserProfileDto) {
        try {
            const { tenantId } = user;
            const updatedUser = await this.driverUserService.update(driverUpdateUserProfileDto, tenantId);
            return updatedUser;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateUserField(DriverRequestUpdateUserFieldDto, user) {
        const { tenantId, _id } = user;
        const { fieldName, value } = DriverRequestUpdateUserFieldDto;
        return this.driverUserService.updateUserField(_id, fieldName, value, tenantId);
    }
};
exports.DriverUserController = DriverUserController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.DRIVER, roles_constants_1.ROLE_CONSTANTS.TENANT_OPERATOR, roles_constants_1.ROLE_CONSTANTS.TENANT, roles_constants_1.ROLE_CONSTANTS.ADMIN, roles_constants_1.ROLE_CONSTANTS.POS),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Put)('profile'),
    __param(0, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_token_dto_1.UserTokenDto,
        driver_update_user_dto_1.DriverUpdateUserProfileDto]),
    __metadata("design:returntype", Promise)
], DriverUserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, strip_fields_interceptor_1.StripFields)(['password'])),
    (0, common_1.Post)('update-user-field'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driver_user_dto_1.DriverRequestUpdateUserFieldDto,
        user_token_dto_1.UserTokenDto]),
    __metadata("design:returntype", Promise)
], DriverUserController.prototype, "updateUserField", null);
exports.DriverUserController = DriverUserController = __decorate([
    (0, common_1.Controller)('driver/users'),
    __metadata("design:paramtypes", [driver_user_service_1.DriverUserService])
], DriverUserController);
//# sourceMappingURL=driver-user.controller.js.map
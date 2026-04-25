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
exports.PosSettingsController = void 0;
const common_1 = require("@nestjs/common");
const settings_service_1 = require("../../core/settings/settings.service");
const mongoose_1 = require("mongoose");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const current_user_decorator_1 = require("../../../decorators/current-user.decorator");
const user_dto_1 = require("../../core/user/user/dto/user.dto");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let PosSettingsController = class PosSettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async findByGroup(groupName, user) {
        return this.settingsService.findByGroupName(groupName, user.tenantId);
    }
    async findAll(user) {
        return this.settingsService.findAll(user.tenantId);
    }
    async findByName(name, user) {
        return this.settingsService.findByName(name, user.tenantId);
    }
    async findOne(id, user) {
        return this.settingsService.findOne(id, user.tenantId);
    }
};
exports.PosSettingsController = PosSettingsController;
__decorate([
    (0, common_1.Get)('group/:groupName'),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    __param(0, (0, common_1.Param)('groupName')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PosSettingsController.prototype, "findByGroup", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PosSettingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('name/:name'),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PosSettingsController.prototype, "findByName", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.POS, roles_constants_1.ROLE_CONSTANTS.ADMIN),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PosSettingsController.prototype, "findOne", null);
exports.PosSettingsController = PosSettingsController = __decorate([
    (0, common_1.Controller)('pos/settings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], PosSettingsController);
//# sourceMappingURL=pos-settings.controller.js.map
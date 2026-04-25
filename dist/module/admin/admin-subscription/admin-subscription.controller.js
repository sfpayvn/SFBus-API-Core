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
exports.AdminSubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../../guards/roles.guard");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const create_subscription_dto_1 = require("../../core/subscription/dto/create-subscription.dto");
const update_subscription_dto_1 = require("../../core/subscription/dto/update-subscription.dto");
const admin_subscription_service_1 = require("./admin-subscription.service");
const parse_objectId_pipe_1 = require("../../../common/pipes/parse-objectId.pipe");
const admin_subscription_dto_1 = require("./dto/admin-subscription.dto");
const roles_constants_1 = require("../../../common/constants/roles.constants");
let AdminSubscriptionController = class AdminSubscriptionController {
    constructor(adminSubscriptionService) {
        this.adminSubscriptionService = adminSubscriptionService;
    }
    create(createSubscriptionDto) {
        return this.adminSubscriptionService.create(createSubscriptionDto);
    }
    update(updateSubscriptionDto) {
        return this.adminSubscriptionService.update(updateSubscriptionDto);
    }
    remove(id) {
        return this.adminSubscriptionService.delete(id);
    }
    findOne(id) {
        return this.adminSubscriptionService.findOne(id);
    }
    findAll() {
        return this.adminSubscriptionService.findAll();
    }
    findAllAvailable() {
        return this.adminSubscriptionService.findAllAvailable();
    }
    async search(query) {
        const { pageIdx = 0, pageSize = 0, keyword = '', sortBy = {
            key: 'createdAt',
            value: 'desc',
        }, filters = [], } = query;
        return this.adminSubscriptionService.search(+pageIdx, +pageSize, keyword, sortBy, filters);
    }
};
exports.AdminSubscriptionController = AdminSubscriptionController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subscription_dto_1.CreateSubscriptionDto]),
    __metadata("design:returntype", void 0)
], AdminSubscriptionController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_subscription_dto_1.UpdateSubscriptionDto]),
    __metadata("design:returntype", void 0)
], AdminSubscriptionController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], AdminSubscriptionController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], AdminSubscriptionController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)('find-all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminSubscriptionController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Get)('find-all-available'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminSubscriptionController.prototype, "findAllAvailable", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)(parse_objectId_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_subscription_dto_1.AdminSearchSubscriptionQuery]),
    __metadata("design:returntype", Promise)
], AdminSubscriptionController.prototype, "search", null);
exports.AdminSubscriptionController = AdminSubscriptionController = __decorate([
    (0, common_1.Controller)('admin/subscription'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_constants_1.ROLE_CONSTANTS.ADMIN),
    __metadata("design:paramtypes", [admin_subscription_service_1.AdminSubscriptionService])
], AdminSubscriptionController);
//# sourceMappingURL=admin-subscription.controller.js.map
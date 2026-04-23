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
exports.AdminUserMainService = void 0;
const user_schema_1 = require("../../../core/user/user/schema/user.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../../../core/user/user/user.service");
let AdminUserMainService = class AdminUserMainService {
    constructor(userModel, userService) {
        this.userModel = userModel;
        this.userService = userService;
    }
    async create(adminCreateUserDto, tenantId) {
        return this.userService.create(adminCreateUserDto, tenantId);
    }
    async update(adminUpdateUserProfileDto, tenantId) {
        return this.userService.update(adminUpdateUserProfileDto, tenantId);
    }
    async updateUserField(userId, fieldName, value, tenantId) {
        const result = await this.userService.updateUserField(userId, fieldName, value, tenantId);
        return result != null;
    }
    async updatePassword(userId, adminUpdatePasswordUserDto, tenantId) {
        const result = await this.userService.updatePassword(userId, adminUpdatePasswordUserDto, tenantId);
        return result != null;
    }
    async setPasswordAsTemp(userId, tempPassword, tenantId) {
        return this.userService.setPasswordAsTemp(userId, tempPassword, tenantId);
    }
    delete(id) {
        return this.userService.delete(id);
    }
    async findById(userId, tenantId) {
        return this.userService.findById(userId, tenantId);
    }
    async findByIds(userIds, tenantId) {
        return this.userService.findByIds(userIds, tenantId);
    }
    async findByPhoneNumber(phoneNumber, tenantId) {
        return this.userService.findByPhoneNumber(phoneNumber, tenantId);
    }
    async findAll(tenantId) {
        return this.userService.findAll(tenantId);
    }
    async findAllByRole(role, tenantId) {
        return this.userService.findAllByRole(role, tenantId);
    }
    async findOne(id, tenantId) {
        return this.userService.findOne(id, tenantId);
    }
    async findByPhone(phoneNumber, tenantId) {
        return this.userService.findByPhone(phoneNumber, tenantId);
    }
    async findByEmail(email, tenantId) {
        return this.userService.findByEmail(email, tenantId);
    }
    async findOneByRole(role, tenantId) {
        return this.userService.findOneByRole(role, tenantId);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        return this.userService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.AdminUserMainService = AdminUserMainService;
exports.AdminUserMainService = AdminUserMainService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.UserDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], AdminUserMainService);
//# sourceMappingURL=admin-user-main.service.js.map
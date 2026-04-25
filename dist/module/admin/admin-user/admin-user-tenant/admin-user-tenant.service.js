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
exports.AdminUserTenantService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../../core/user/user/schema/user.schema");
const user_tenant_service_1 = require("../../../core/user/user-tenant/user-tenant.service");
let AdminUserTenantService = class AdminUserTenantService {
    constructor(userModel, userTenantService) {
        this.userModel = userModel;
        this.userTenantService = userTenantService;
    }
    async create(createUserDto) {
        return this.userTenantService.create(createUserDto);
    }
    async update(updateUserDto) {
        return this.userTenantService.update(updateUserDto);
    }
    async findById(userId) {
        return this.userTenantService.findById(userId);
    }
    async findAll() {
        return this.userTenantService.findAll();
    }
    async findByPhoneNumber(phoneNumber) {
        return this.userTenantService.findByPhoneNumber(phoneNumber);
    }
    async findByEmail(email) {
        return this.userTenantService.findByEmail(email);
    }
    async updatePassword(userId, updatePasswordUserDto) {
        const result = await this.userTenantService.updatePassword(userId, updatePasswordUserDto);
        return result != null;
    }
    async setPasswordAsTemp(userId, tempPassword) {
        return this.userTenantService.setPasswordAsTemp(userId, tempPassword);
    }
    async delete(id) {
        return this.userTenantService.delete(id);
    }
    async updateUserProfile(updateUserDto) {
        return this.userTenantService.updateUserProfile(updateUserDto);
    }
    async findByIds(userIds) {
        return this.userTenantService.findByIds(userIds);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters) {
        return this.userTenantService.search(pageIdx, pageSize, keyword, sortBy, filters);
    }
};
exports.AdminUserTenantService = AdminUserTenantService;
exports.AdminUserTenantService = AdminUserTenantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.UserDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_tenant_service_1.UserTenantService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_tenant_service_1.UserTenantService])
], AdminUserTenantService);
//# sourceMappingURL=admin-user-tenant.service.js.map
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
exports.AdminUserPosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../../core/user/user/schema/user.schema");
const user_pos_service_1 = require("../../../core/user/user-pos/user_pos.service");
let AdminUserPosService = class AdminUserPosService {
    constructor(userModel, userPosService) {
        this.userModel = userModel;
        this.userPosService = userPosService;
    }
    async create(adminCreateUserDto, tenantId) {
        return this.userPosService.create(adminCreateUserDto, tenantId);
    }
    async update(adminUpdateUserProfileDto, tenantId) {
        const result = await this.userPosService.update(adminUpdateUserProfileDto, tenantId);
        return result != null;
    }
    async updateUserField(userId, fieldName, value, tenantId) {
        const result = await this.userPosService.updateUserField(userId, fieldName, value, tenantId);
        return result != null;
    }
    async updatePassword(userId, adminUpdatePasswordUserDto, tenantId) {
        const result = await this.userPosService.updatePassword(userId, adminUpdatePasswordUserDto, tenantId);
        return result != null;
    }
    async setPasswordAsTemp(userId, tempPassword, tenantId) {
        return this.userPosService.setPasswordAsTemp(userId, tempPassword, tenantId);
    }
    delete(id) {
        return this.userPosService.delete(id);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        return this.userPosService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
    }
};
exports.AdminUserPosService = AdminUserPosService;
exports.AdminUserPosService = AdminUserPosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.UserDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_pos_service_1.UserPosService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_pos_service_1.UserPosService])
], AdminUserPosService);
//# sourceMappingURL=admin-user-pos.service.js.map
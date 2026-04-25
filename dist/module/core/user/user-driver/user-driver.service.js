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
exports.UserDriverService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../user/user.service");
const user_dto_1 = require("../user/dto/user.dto");
const user_schema_1 = require("../user/schema/user.schema");
const class_transformer_1 = require("class-transformer");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let UserDriverService = class UserDriverService {
    constructor(userModel, userService) {
        this.userModel = userModel;
        this.userService = userService;
    }
    async create(createUserDto, tenantId) {
        createUserDto.roles = [roles_constants_1.ROLE_CONSTANTS.DRIVER];
        return this.userService.create(createUserDto, tenantId);
    }
    async update(updateUserProfileDto, tenantId) {
        return this.userService.update(updateUserProfileDto, tenantId);
    }
    async updateUserField(userId, fieldName, value, tenantId) {
        return this.userService.updateUserField(userId, fieldName, value, tenantId);
    }
    async updatePassword(userId, updatePasswordUserDto, tenantId) {
        return this.userService.updatePassword(userId, updatePasswordUserDto, tenantId);
    }
    async setPasswordAsTemp(userId, tempPassword, tenantId) {
        return this.userService.setPasswordAsTemp(userId, tempPassword, tenantId);
    }
    delete(id) {
        return this.userService.delete(id);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const pipeline = await this.userService.buildQuerySearch(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
        const matchStageIndex = pipeline.findIndex((stage) => stage.$match);
        if (matchStageIndex !== -1) {
            pipeline[matchStageIndex].$match = {
                ...pipeline[matchStageIndex].$match,
                roles: { $in: [roles_constants_1.ROLE_CONSTANTS.DRIVER] },
            };
        }
        else {
            pipeline.unshift({
                $match: { roles: { $in: [roles_constants_1.ROLE_CONSTANTS.DRIVER] } },
            });
        }
        const usersModel = await this.userModel.aggregate(pipeline).exec();
        const totalItem = await this.userModel.countDocuments({ tenantId, roles: { $in: [roles_constants_1.ROLE_CONSTANTS.DRIVER] } });
        let users = usersModel.map((user) => (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, user));
        users = await this.userService.mapUserAvatarUrl(users);
        return {
            pageIdx,
            users: users,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
};
exports.UserDriverService = UserDriverService;
exports.UserDriverService = UserDriverService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.UserDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], UserDriverService);
//# sourceMappingURL=user-driver.service.js.map
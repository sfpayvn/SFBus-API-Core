"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const user_schema_1 = require("./schema/user.schema");
const user_dto_1 = require("./dto/user.dto");
const class_transformer_1 = require("class-transformer");
const tenant_service_1 = require("../../tenant/tenant.service");
const tenant_subscription_service_1 = require("../../tenant-subscription/tenant-subscription.service");
let UserService = class UserService {
    constructor(userModel, tenantService, tenantSubscriptionService) {
        this.userModel = userModel;
        this.tenantService = tenantService;
        this.tenantSubscriptionService = tenantSubscriptionService;
    }
    async create(createUserDto, tenantId) {
        const { password, phoneNumber } = createUserDto;
        const baseQuery = tenantId ? { tenantId } : {};
        const userExists = await this.userModel.findOne({
            $and: [baseQuery, { $or: [{ phoneNumber }] }],
        });
        if (userExists) {
            if (userExists.phoneNumber === phoneNumber) {
                throw new common_1.BadRequestException('Số điện thoại đã được sử dụng.');
            }
        }
        createUserDto.addresses?.map((address) => {
            address._id = new mongoose_2.Types.ObjectId();
        });
        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
            ...(tenantId && { tenantId }),
        });
        const savedUser = await newUser.save();
        return (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, savedUser.toObject());
    }
    async update(updateUserDto, tenantId) {
        const userModel = await this.userModel.findOne({ _id: updateUserDto._id, tenantId });
        if (!userModel) {
            throw new common_1.NotFoundException('Người dùng không tồn tại.');
        }
        const { email } = updateUserDto;
        if (email && email !== userModel.email) {
            const emailExists = await this.userModel.findOne({ email, tenantId });
            if (emailExists && emailExists._id != updateUserDto._id) {
                throw new common_1.BadRequestException('Email đã được sử dụng.');
            }
        }
        updateUserDto.addresses =
            updateUserDto.addresses &&
                (await updateUserDto.addresses.map((address) => {
                    if (!address._id) {
                        address._id = new mongoose_2.Types.ObjectId();
                    }
                    return address;
                }));
        Object.assign(userModel, updateUserDto);
        const updatedUser = await userModel.save();
        let user = (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, updatedUser.toObject());
        const usersMaped = await this.mapUserAvatarUrl([user]);
        if (!usersMaped || usersMaped.length === 0) {
            return user;
        }
        user = usersMaped[0];
        return user;
    }
    async updateUserProfile(updateUserDto, tenantId) {
        const userModel = await this.userModel.findOne({ _id: updateUserDto._id, tenantId });
        if (!userModel) {
            throw new common_1.NotFoundException('Người dùng không tồn tại.');
        }
        const { email, avatarId, name, addresses, gender, birthdate } = updateUserDto;
        if (email !== undefined && email !== userModel.email) {
            const emailExists = await this.userModel.findOne({ email, tenantId });
            if (emailExists && emailExists._id.toString() !== updateUserDto._id.toString()) {
                throw new common_1.BadRequestException('Email đã được sử dụng.');
            }
            userModel.email = email;
        }
        if (avatarId !== undefined) {
            userModel.avatarId = new mongoose_2.Types.ObjectId(avatarId);
        }
        if (name !== undefined) {
            userModel.name = name;
        }
        if (addresses !== undefined) {
            userModel.addresses = addresses.map((address) => {
                if (!address._id) {
                    address._id = new mongoose_2.Types.ObjectId();
                }
                return address;
            });
        }
        if (gender !== undefined) {
            userModel.gender = gender;
        }
        if (birthdate !== undefined) {
            userModel.birthdate = new Date(birthdate);
        }
        const updatedUser = await userModel.save();
        let user = (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, updatedUser.toObject());
        const usersMaped = await this.mapUserAvatarUrl([user]);
        if (!usersMaped || usersMaped.length === 0) {
            return user;
        }
        user = usersMaped[0];
        return user;
    }
    async updateUserField(userId, fieldName, value, tenantId) {
        const forbidden = ['phoneNumber', 'email', 'password'];
        if (forbidden.includes(fieldName)) {
            throw new common_1.BadRequestException('Updating phoneNumber, email or password is not allowed via this method.');
        }
        const userModel = await this.userModel.findOneAndUpdate({ _id: userId, tenantId }, { $set: { [fieldName]: value } }, { new: true, runValidators: true });
        if (!userModel) {
            throw new common_1.NotFoundException('Người dùng không tồn tại.');
        }
        return (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, userModel);
    }
    async updatePassword(userId, updatePasswordUserDto, tenantId) {
        const user = await this.userModel.findOne({ _id: userId, tenantId });
        if (!user)
            throw new common_1.NotFoundException('Người dùng không tồn tại.');
        const { oldPassword, password } = updatePasswordUserDto;
        if (oldPassword === password) {
            throw new common_1.BadRequestException('Mật khẩu mới không được trùng với mật khẩu cũ');
        }
        const isOldPasswordRequired = !user.isTempPassWord && !oldPassword;
        const isOldPasswordInvalid = !user.isTempPassWord && !(await bcrypt.compare(oldPassword, user.password));
        if (isOldPasswordRequired || isOldPasswordInvalid) {
            throw new common_1.BadRequestException('Mật khẩu cũ không đúng');
        }
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        const updatedUser = await user.save();
        await this.updateUserField(userId, 'isTempPassWord', false, tenantId);
        if (!updatedUser) {
            throw new common_1.BadRequestException('Cập nhật mật khẩu thất bại.');
        }
        return (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, updatedUser.toObject());
    }
    async setPasswordAsTemp(userId, tempPassword, tenantId) {
        const isRootTenant = tenantId.toString() === process.env.ROOT_TENANT_ID;
        const query = isRootTenant ? { _id: userId } : { _id: userId, tenantId };
        const user = await this.userModel.findOne(query);
        if (!user)
            throw new common_1.NotFoundException('Người dùng không tồn tại.');
        user.password = await bcrypt.hash(tempPassword, 10);
        user.isTempPassWord = true;
        const updatedUser = await user.save();
        if (!updatedUser) {
            throw new common_1.BadRequestException('Cập nhật mật khẩu tạm thời thất bại.');
        }
        return true;
    }
    async markIdentifierAsVerified(userId, tenantId, identifier) {
        const updatedUser = await this.userModel
            .updateOne({ _id: userId, tenantId, phoneNumber: identifier }, { isPhoneNumberVerified: true }, { new: true })
            .lean()
            .exec();
        return (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, updatedUser);
    }
    async delete(id) {
        const res = await this.userModel.findByIdAndDelete(id).lean().exec();
        return res !== null;
    }
    async findById(userId, tenantId) {
        const userModel = await this.userModel.findOne({ _id: userId, tenantId }).lean().exec();
        if (!userModel) {
            throw new common_1.NotFoundException(`User with ID "${userId}" not found.`);
        }
        let user = (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, userModel);
        const userMap = await this.mapUserAvatarUrl([user]);
        user = userMap[0];
        return user;
    }
    async findByIds(userIds, tenantId) {
        const usersModel = await this.userModel
            .find({ _id: { $in: userIds }, tenantId })
            .lean()
            .exec();
        if (!usersModel || usersModel.length === 0) {
            return null;
        }
        let users = usersModel.map((user) => (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, user));
        users = await this.mapUserAvatarUrl(users);
        return users;
    }
    async findByPhoneNumber(phoneNumber, tenantId) {
        const query = tenantId ? { phoneNumber: phoneNumber, tenantId } : { phoneNumber: phoneNumber };
        const userModel = await this.userModel.findOne(query).lean().exec();
        if (!userModel) {
            return null;
        }
        const user = (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, userModel);
        const userAfterMap = await this.mapUserAvatarUrl([user]);
        return userAfterMap[0];
    }
    async findAll(tenantId) {
        const usersModel = await this.userModel.find({ tenantId }).lean().exec();
        let users = usersModel.map((user) => (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, user));
        users = await this.mapUserAvatarUrl(users);
        return users;
    }
    async findAllByRole(role, tenantId) {
        const usersModel = await this.userModel
            .find({ roles: { $in: [role] }, tenantId })
            .lean()
            .exec();
        let users = usersModel.map((user) => (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, user));
        users = await this.mapUserAvatarUrl(users);
        return users;
    }
    async findOne(id, tenantId) {
        const userModel = await this.userModel.findOne({ _id: id, tenantId }).lean().exec();
        if (!userModel) {
            throw new common_1.NotFoundException(`Bus type with ID "${id}" not found.`);
        }
        const user = (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, userModel);
        const userAfterMap = await this.mapUserAvatarUrl([user]);
        return userAfterMap[0];
    }
    async findByPhone(phoneNumber, tenantId) {
        const userModel = await this.userModel.findOne({ phoneNumber, tenantId }).lean().exec();
        if (!userModel) {
            throw new common_1.NotFoundException(`Bus type with phone number "${phoneNumber}" not found.`);
        }
        const user = (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, userModel);
        const userAfterMap = await this.mapUserAvatarUrl([user]);
        return userAfterMap[0];
    }
    async findByEmail(email, tenantId) {
        const userModel = await this.userModel.findOne({ email, tenantId }).lean().exec();
        if (!userModel) {
            throw new common_1.NotFoundException(`Bus type with email "${email}" not found.`);
        }
        const user = (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, userModel);
        const userAfterMap = await this.mapUserAvatarUrl([user]);
        return userAfterMap[0];
    }
    async findOneByRole(role, tenantId) {
        const userModel = await this.userModel.findOne({ role, tenantId }).lean().exec();
        if (!userModel) {
            throw new common_1.NotFoundException(`Bus type with role "${role}" not found.`);
        }
        const user = (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, userModel);
        const userAfterMap = await this.mapUserAvatarUrl([user]);
        return userAfterMap[0];
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const pipeline = await this.buildQuerySearch(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
        const usersModel = await this.userModel.aggregate(pipeline).exec();
        const totalItem = await this.userModel.countDocuments({ tenantId });
        let users = usersModel.map((user) => (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, user));
        users = await await this.mapUserAvatarUrl(users);
        return {
            pageIdx,
            users: users,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearch(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const pipeline = [{ $match: { tenantId } }];
        const matchConditions = [];
        if (keyword) {
            matchConditions.push({
                $or: [{ name: { $regex: keyword, $options: 'i' } }],
            });
        }
        if (Array.isArray(filters)) {
            await Promise.all(filters.map(async ({ key, value }) => {
                if (!key || value == null)
                    return;
                else {
                    matchConditions.push({ [key]: { $in: value } });
                }
            }));
        }
        if (matchConditions.length) {
            pipeline.push({
                $match: { $and: matchConditions },
            });
        }
        if (sortBy?.key) {
            pipeline.push({
                $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
            });
        }
        pipeline.push({ $skip: skip }, { $limit: pageSize });
        return pipeline;
    }
    async mapUserAvatarUrl(users) {
        const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
        return await Promise.all(users.map(async (user) => {
            if (user.avatarId) {
                user.avatar = `${process.env.DOMAIN}${port}/file/view/${user.avatarId.toString()}`;
            }
            return user;
        }));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.UserDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => tenant_service_1.TenantService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        tenant_service_1.TenantService,
        tenant_subscription_service_1.TenantSubscriptionService])
], UserService);
//# sourceMappingURL=user.service.js.map
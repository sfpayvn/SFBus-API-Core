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
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_transformer_1 = require("class-transformer");
const tenant_dto_1 = require("./dto/tenant.dto");
const tenant_schema_1 = require("./schema/tenant.schema");
const tenant_subscription_service_1 = require("../tenant-subscription/tenant-subscription.service");
const file_service_1 = require("../file/file/file.service");
const user_service_1 = require("../user/user/user.service");
const roles_constants_1 = require("../../../common/constants/roles.constants");
const subscription_service_1 = require("../subscription/subscription.service");
const settings_service_1 = require("../settings/settings.service");
let TenantService = class TenantService {
    constructor(tenantModel, tenantSubscriptionService, fileService, userService, subscriptionService, settingsService) {
        this.tenantModel = tenantModel;
        this.tenantSubscriptionService = tenantSubscriptionService;
        this.fileService = fileService;
        this.userService = userService;
        this.subscriptionService = subscriptionService;
        this.settingsService = settingsService;
    }
    async create(createTenantDto) {
        try {
            const popularSubscription = this.subscriptionService.findPopular();
            if (!popularSubscription) {
                throw new common_1.NotFoundException('No popular subscription found to assign to new tenant.');
            }
            const created = new this.tenantModel(createTenantDto);
            const saved = await created.save();
            const tenantId = saved._id;
            const registerSubscriptionDto = {
                subscriptionId: (await popularSubscription)._id,
                startAt: new Date().toISOString(),
            };
            await this.tenantSubscriptionService.registerForTenant(tenantId, registerSubscriptionDto);
            try {
                await this.userService.create({
                    tenantId,
                    phoneNumber: createTenantDto.phoneNumber,
                    password: process.env.DEFAULT_TENANT_USER_PASSWORD || 'Abc@12345',
                    name: createTenantDto.name,
                    roles: roles_constants_1.DEFAULT_TENANT_USER_ROLES,
                    isTempPassWord: true,
                }, tenantId);
            }
            catch (userError) {
                console.error(`Failed to create user for tenant: ${userError.message}`);
            }
            const settingsToCreate = [
                {
                    name: 'organizationName',
                    value: createTenantDto.name,
                    groupName: 'organization',
                },
                {
                    name: 'address',
                    value: createTenantDto.address || '',
                    groupName: 'organization',
                },
                {
                    name: 'phone',
                    value: createTenantDto.phoneNumber || '',
                    groupName: 'organization',
                },
                {
                    name: 'email',
                    value: createTenantDto.email || '',
                    groupName: 'organization',
                },
            ];
            this.settingsService.createsOrUpdates(settingsToCreate, tenantId);
            const dto = (0, class_transformer_1.plainToInstance)(tenant_dto_1.TenantDto, saved.toObject());
            const [result] = await this.mapLogoUrl([dto]);
            return result;
        }
        catch (error) {
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                if (field === 'code') {
                    throw new common_1.NotFoundException(`Code "${createTenantDto.code}" already exists.`);
                }
                else if (field === 'phoneNumber') {
                    throw new common_1.NotFoundException(`Phone number "${createTenantDto.phoneNumber}" already exists.`);
                }
            }
            throw error;
        }
    }
    async update(updateTenantDto) {
        try {
            const oldTenant = await this.tenantModel.findById(updateTenantDto._id).lean().exec();
            if (!oldTenant) {
                throw new common_1.NotFoundException(`Tenant with ID "${updateTenantDto._id}" not found.`);
            }
            if (updateTenantDto.logoId &&
                oldTenant.logoId &&
                oldTenant.logoId.toString() !== updateTenantDto.logoId.toString()) {
                try {
                    await this.fileService.delete(oldTenant.logoId, updateTenantDto._id);
                }
                catch (error) {
                    console.error(`Failed to delete old logo file: ${error.message}`);
                }
            }
            const { code, ...updateData } = updateTenantDto;
            const updated = await this.tenantModel
                .findByIdAndUpdate(updateTenantDto._id, updateData, { new: true })
                .lean()
                .exec();
            const dto = (0, class_transformer_1.plainToInstance)(tenant_dto_1.TenantDto, updated);
            const [result] = await this.mapLogoUrl([dto]);
            return result;
        }
        catch (error) {
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                if (field === 'code') {
                    throw new common_1.NotFoundException(`Code "${updateTenantDto.code}" already exists.`);
                }
                else if (field === 'phoneNumber') {
                    throw new common_1.NotFoundException(`Phone number "${updateTenantDto.phoneNumber}" already exists.`);
                }
            }
            throw error;
        }
    }
    async delete(id) {
        const res = await this.tenantModel.findByIdAndDelete(id).lean().exec();
        return res !== null;
    }
    async findAll() {
        const tenants = await this.tenantModel.find().lean().exec();
        const dtosArray = tenants.map((t) => (0, class_transformer_1.plainToInstance)(tenant_dto_1.TenantDto, t));
        return await this.mapLogoUrl(dtosArray);
    }
    async validateTenant(phoneNumber) {
        const tenantModel = await this.tenantModel.findOne({ 'contact.phoneNumber': phoneNumber }).lean().exec();
        if (!tenantModel) {
            return null;
        }
        const dto = (0, class_transformer_1.plainToInstance)(tenant_dto_1.TenantDto, tenantModel);
        const [result] = await this.mapLogoUrl([dto]);
        return result;
    }
    async findOne(id) {
        const tenant = await this.tenantModel.findById(id).lean().exec();
        if (!tenant) {
            return null;
        }
        const dto = (0, class_transformer_1.plainToInstance)(tenant_dto_1.TenantDto, tenant);
        const [result] = await this.mapLogoUrl([dto]);
        return result;
    }
    async findByCode(code) {
        const tenant = await this.tenantModel.findOne({ code }).lean().exec();
        if (!tenant) {
            throw new common_1.NotFoundException(`Tenant with code "${code}" not found.`);
        }
        const dto = (0, class_transformer_1.plainToInstance)(tenant_dto_1.TenantDto, tenant);
        const [result] = await this.mapLogoUrl([dto]);
        return result;
    }
    async findByPhoneNumber(phoneNumber) {
        const tenant = await this.tenantModel.findOne({ phoneNumber }).lean().exec();
        if (!tenant) {
            throw new common_1.NotFoundException(`Tenant with phone number "${phoneNumber}" not found.`);
        }
        const dto = (0, class_transformer_1.plainToInstance)(tenant_dto_1.TenantDto, tenant);
        const [result] = await this.mapLogoUrl([dto]);
        return result;
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters) {
        const pipeline = await this.buildQuerySearchTenants(pageIdx, pageSize, keyword, sortBy, filters);
        const tenants = await this.tenantModel.aggregate(pipeline).exec();
        const totalItem = await this.tenantModel.countDocuments({});
        let result = (0, class_transformer_1.plainToInstance)(tenant_dto_1.TenantDto, await Promise.all(tenants.map(async (tenant) => {
            const subscription = await this.tenantSubscriptionService.getActive(tenant._id);
            const subscriptionId = subscription ? subscription.subscriptionId : null;
            return { ...tenant, subscriptionId };
        })));
        return {
            pageIdx,
            tenants: await this.mapLogoUrl(result),
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchTenants(pageIdx, pageSize, keyword, sortBy, filters) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const pipeline = [];
        const matchConditions = [];
        if (keyword) {
            matchConditions.push({
                $or: [{ name: { $regex: keyword, $options: 'i' } }],
            });
        }
        let startDateValue = '';
        let endDateValue = '';
        if (Array.isArray(filters)) {
            await Promise.all(filters.map(async ({ key, value }) => {
                if (!key || value == null)
                    return;
                if (key === 'startDate') {
                    startDateValue = value;
                }
                else if (key === 'endDate') {
                    endDateValue = value;
                }
                else {
                    matchConditions.push({ [key]: value });
                }
            }));
        }
        if (startDateValue || endDateValue) {
            const rangeCond = {};
            if (startDateValue)
                rangeCond.$gte = startDateValue;
            if (endDateValue)
                rangeCond.$lte = endDateValue;
            matchConditions.push({ createDate: rangeCond });
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
    async mapLogoUrl(tenants) {
        const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
        return tenants.map((tenant) => ({
            ...tenant,
            logo: tenant.logoId ? `${process.env.DOMAIN}${port}/file/view/${tenant.logoId.toString()}` : undefined,
        }));
    }
};
exports.TenantService = TenantService;
exports.TenantService = TenantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tenant_schema_1.TenantDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => tenant_subscription_service_1.TenantSubscriptionService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => file_service_1.FileService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => subscription_service_1.SubscriptionService))),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => settings_service_1.SettingsService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        tenant_subscription_service_1.TenantSubscriptionService,
        file_service_1.FileService,
        user_service_1.UserService,
        subscription_service_1.SubscriptionService,
        settings_service_1.SettingsService])
], TenantService);
//# sourceMappingURL=tenant.service.js.map
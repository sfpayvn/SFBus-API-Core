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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const setting_schema_1 = require("./schema/setting.schema");
const setting_dto_1 = require("./dto/setting.dto");
const class_transformer_1 = require("class-transformer");
const utils_1 = require("../../../utils/utils");
let SettingsService = class SettingsService {
    constructor(settingModel) {
        this.settingModel = settingModel;
        this.ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
    }
    async create(createSettingDto, tenantId) {
        const { name } = createSettingDto;
        const settingExists = await this.settingModel.findOne({ name, tenantId });
        if (settingExists) {
            throw new common_1.BadRequestException('Tên setting đã được sử dụng.');
        }
        const newSetting = new this.settingModel({
            ...createSettingDto,
            tenantId,
        });
        const savedSetting = await newSetting.save();
        return (0, class_transformer_1.plainToInstance)(setting_dto_1.SettingDto, savedSetting.toObject());
    }
    async update(updateSettingDto, tenantId) {
        const settingModel = await this.settingModel.findOne({ _id: updateSettingDto._id, tenantId });
        if (!settingModel) {
            throw new common_1.NotFoundException('Setting không tồn tại.');
        }
        const { name } = updateSettingDto;
        if (name !== undefined && name !== settingModel.name) {
            const nameExists = await this.settingModel.findOne({ name, tenantId });
            if (nameExists && nameExists._id.toString() !== updateSettingDto._id.toString()) {
                throw new common_1.BadRequestException('Tên setting đã được sử dụng.');
            }
        }
        Object.assign(settingModel, updateSettingDto);
        const updatedSetting = await settingModel.save();
        return (0, class_transformer_1.plainToInstance)(setting_dto_1.SettingDto, updatedSetting.toObject());
    }
    async delete(id, tenantId) {
        const result = await this.settingModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        return result !== null;
    }
    async findAll(tenantId) {
        const settingsModel = await this.settingModel.find({ tenantId }).lean().exec();
        return settingsModel.map((setting) => (0, class_transformer_1.plainToInstance)(setting_dto_1.SettingDto, setting));
    }
    async findOne(id, tenantId) {
        const settingModel = await this.settingModel.findOne({ _id: id, tenantId }).lean().exec();
        if (!settingModel) {
            throw new common_1.NotFoundException(`Setting with ID "${id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(setting_dto_1.SettingDto, settingModel);
    }
    async findByName(name, tenantId) {
        let settingModel = await this.settingModel.findOne({ name, tenantId }).lean().exec();
        if (!settingModel) {
            const rootTenantObjectId = (0, utils_1.toObjectId)(this.ROOT_TENANT_ID);
            settingModel = await this.settingModel.findOne({ name, tenantId: rootTenantObjectId }).lean().exec();
            if (!settingModel) {
                throw new common_1.NotFoundException(`Setting with name "${name}" not found.`);
            }
        }
        return (0, class_transformer_1.plainToInstance)(setting_dto_1.SettingDto, settingModel);
    }
    async getAppVersion(tenantId) {
        try {
            const query = { name: 'APP_VERSION' };
            if (tenantId) {
                query['tenantId'] = tenantId;
            }
            const setting = await this.settingModel.findOne(query).lean().exec();
            if (setting?.value) {
                return setting.value;
            }
            return process.env.APP_VERSION || '1.0.0';
        }
        catch (error) {
            console.warn('Failed to get APP_VERSION from DB, using env fallback:', error);
            return process.env.APP_VERSION || '1.0.0';
        }
    }
    async updateMany(updateSettings, tenantId) {
        if (!Array.isArray(updateSettings) || updateSettings.length === 0) {
            throw new common_1.BadRequestException('No settings provided for update.');
        }
        const ids = updateSettings.map((s) => s._id);
        const existing = await this.settingModel.find({ _id: { $in: ids }, tenantId }).exec();
        const existingMap = new Map(existing.map((e) => [e._id.toString(), e]));
        for (const dto of updateSettings) {
            const found = existingMap.get(dto._id.toString());
            if (!found) {
                throw new common_1.NotFoundException(`Setting with ID "${dto._id}" not found.`);
            }
            if (dto.name !== undefined && dto.name !== found.name) {
                const nameExists = await this.settingModel.findOne({ name: dto.name, tenantId }).lean().exec();
                if (nameExists && nameExists._id.toString() !== dto._id.toString()) {
                    throw new common_1.BadRequestException(`Setting name "${dto.name}" is already used.`);
                }
            }
        }
        const ops = updateSettings.map((dto) => ({
            updateOne: {
                filter: { _id: dto._id, tenantId },
                update: { $set: dto },
            },
        }));
        await this.settingModel.bulkWrite(ops);
        const updated = await this.settingModel
            .find({ _id: { $in: ids }, tenantId })
            .lean()
            .exec();
        return updated.map((s) => (0, class_transformer_1.plainToInstance)(setting_dto_1.SettingDto, s));
    }
    async findByGroupName(groupName, tenantId) {
        const rootTenantObjectId = (0, utils_1.toObjectId)(this.ROOT_TENANT_ID);
        const [tenantSettings, rootSettings] = await Promise.all([
            this.settingModel.find({ groupName, tenantId }).lean().exec(),
            this.settingModel.find({ groupName, tenantId: rootTenantObjectId }).lean().exec(),
        ]);
        const test = await this.settingModel
            .find({ name: 'child_and_pregnancy_policy', groupName, tenantId: tenantId })
            .lean()
            .exec();
        const tenantKeys = new Set(tenantSettings.map((s) => s.name));
        const mergedSettings = [...tenantSettings, ...rootSettings.filter((s) => !tenantKeys.has(s.name))];
        return mergedSettings.map((s) => (0, class_transformer_1.plainToInstance)(setting_dto_1.SettingDto, s));
    }
    async createsOrUpdates(createSettingDto, tenantId) {
        if (!Array.isArray(createSettingDto) || createSettingDto.length === 0) {
            throw new common_1.BadRequestException('No settings provided for createsOrUpdates.');
        }
        const map = new Map();
        for (const s of createSettingDto) {
            map.set(s.name, s);
        }
        const normalizedTenantId = new mongoose_2.Types.ObjectId(tenantId);
        const ops = [];
        for (const [name, dto] of map.entries()) {
            const setFields = { value: dto.value };
            if (dto.description !== undefined)
                setFields.description = dto.description;
            if (dto.groupName !== undefined)
                setFields.groupName = dto.groupName;
            ops.push({
                updateOne: {
                    filter: { name, tenantId: normalizedTenantId },
                    update: {
                        $set: setFields,
                        $setOnInsert: { name, tenantId: normalizedTenantId },
                    },
                    upsert: true,
                },
            });
        }
        if (ops.length) {
            await this.settingModel.bulkWrite(ops);
        }
        const names = Array.from(map.keys());
        const updated = await this.settingModel
            .find({ name: { $in: names }, tenantId: normalizedTenantId })
            .lean()
            .exec();
        return updated.map((s) => (0, class_transformer_1.plainToInstance)(setting_dto_1.SettingDto, s));
    }
    async createOrUpdate(createSettingDto, tenantId) {
        const { name } = createSettingDto;
        const existing = await this.settingModel.findOne({ name, tenantId }).exec();
        if (existing) {
            existing.value = createSettingDto.value;
            if (createSettingDto.description !== undefined)
                existing.description = createSettingDto.description;
            if (createSettingDto.groupName !== undefined)
                existing.groupName = createSettingDto.groupName;
            const saved = await existing.save();
            return (0, class_transformer_1.plainToInstance)(setting_dto_1.SettingDto, saved.toObject());
        }
        const newSetting = new this.settingModel({ ...createSettingDto, tenantId });
        const saved = await newSetting.save();
        return (0, class_transformer_1.plainToInstance)(setting_dto_1.SettingDto, saved.toObject());
    }
    async createOrUpdates(createSettings, tenantId) {
        if (!Array.isArray(createSettings) || createSettings.length === 0) {
            throw new common_1.BadRequestException('No settings provided for createOrUpdates.');
        }
        const map = new Map();
        for (const s of createSettings) {
            map.set(s.name, s);
        }
        const normalizedTenantId = new mongoose_2.Types.ObjectId(tenantId);
        const ops = [];
        for (const [name, dto] of map.entries()) {
            const setFields = { value: dto.value };
            if (dto.description !== undefined)
                setFields.description = dto.description;
            if (dto.groupName !== undefined)
                setFields.groupName = dto.groupName;
            ops.push({
                updateOne: {
                    filter: { name, tenantId: normalizedTenantId },
                    update: {
                        $set: setFields,
                        $setOnInsert: { name, tenantId: normalizedTenantId },
                    },
                    upsert: true,
                },
            });
        }
        if (ops.length) {
            await this.settingModel.bulkWrite(ops);
        }
        const names = Array.from(map.keys());
        const updated = await this.settingModel
            .find({ name: { $in: names }, tenantId: normalizedTenantId })
            .lean()
            .exec();
        return updated.map((s) => (0, class_transformer_1.plainToInstance)(setting_dto_1.SettingDto, s));
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const { pipeline, matchForCount } = await this.buildQuerySearchSettings(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
        const items = await this.settingModel.aggregate(pipeline).exec();
        const totalItem = await this.settingModel.countDocuments(matchForCount);
        const settings = items.map((item) => (0, class_transformer_1.plainToInstance)(setting_dto_1.SettingDto, item));
        return {
            pageIdx,
            settings,
            totalPage: Math.ceil(totalItem / pageSize),
            totalItem,
        };
    }
    async buildQuerySearchSettings(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const match = { tenantId };
        const ands = [];
        if (keyword) {
            ands.push({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { groupName: { $regex: keyword, $options: 'i' } },
                    { value: { $regex: keyword, $options: 'i' } },
                ],
            });
        }
        let startDateValue = null;
        let endDateValue = null;
        if (Array.isArray(filters)) {
            for (const { key, value } of filters) {
                if (!key || value == null || (Array.isArray(value) && value.length === 0))
                    continue;
                if (key === 'startDate') {
                    const dateValue = (0, utils_1.getFirstValue)(value);
                    startDateValue = new Date(dateValue);
                }
                else if (key === 'endDate') {
                    const dateValue = (0, utils_1.getFirstValue)(value);
                    endDateValue = new Date(dateValue);
                }
                else if (key === 'phoneNumber') {
                    const phoneValue = (0, utils_1.getFirstValue)(value);
                    ands.push({ 'userInfo.phoneNumber': { $regex: phoneValue, $options: 'i' } });
                }
                else {
                    ands.push((0, utils_1.processFilterValue)(key, value));
                }
            }
        }
        if (startDateValue || endDateValue) {
            const range = {};
            if (startDateValue)
                range.$gte = startDateValue;
            if (endDateValue)
                range.$lte = endDateValue;
            ands.push({ createdAt: range });
        }
        if (ands.length)
            match.$and = ands;
        const pipeline = [{ $match: match }];
        if (sortBy?.key) {
            const sortValue = (0, utils_1.getFirstValue)(sortBy.value);
            pipeline.push({ $sort: { [sortBy.key]: sortValue === 'ascend' ? 1 : -1 } });
        }
        pipeline.push({ $skip: skip }, { $limit: pageSize });
        return { pipeline, matchForCount: match };
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(setting_schema_1.Setting.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SettingsService);
//# sourceMappingURL=settings.service.js.map
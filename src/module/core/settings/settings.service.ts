import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Setting } from './schema/setting.schema';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingDto, SearchSettingsRes, SettingSortFilter } from './dto/setting.dto';
import { plainToInstance } from 'class-transformer';
import { getFirstValue, processFilterValue, toObjectId } from '@/utils/utils';

@Injectable()
export class SettingsService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(@InjectModel(Setting.name) private settingModel: Model<Setting>) {}

  async create(createSettingDto: CreateSettingDto, tenantId: Types.ObjectId): Promise<SettingDto> {
    const { name } = createSettingDto;

    // Kiểm tra tính duy nhất của name
    const settingExists = await this.settingModel.findOne({ name, tenantId });
    if (settingExists) {
      throw new BadRequestException('Tên setting đã được sử dụng.');
    }

    const newSetting = new this.settingModel({
      ...createSettingDto,
      tenantId,
    });

    const savedSetting = await newSetting.save();
    return plainToInstance(SettingDto, savedSetting.toObject());
  }

  async update(updateSettingDto: UpdateSettingDto, tenantId: Types.ObjectId): Promise<SettingDto> {
    const settingModel = await this.settingModel.findOne({ _id: updateSettingDto._id, tenantId });
    if (!settingModel) {
      throw new NotFoundException('Setting không tồn tại.');
    }

    // Nếu cập nhật name, cần kiểm tra tính duy nhất
    const { name } = updateSettingDto;
    if (name !== undefined && name !== settingModel.name) {
      const nameExists = await this.settingModel.findOne({ name, tenantId });
      if (nameExists && nameExists._id.toString() !== updateSettingDto._id.toString()) {
        throw new BadRequestException('Tên setting đã được sử dụng.');
      }
    }

    Object.assign(settingModel, updateSettingDto);
    const updatedSetting = await settingModel.save();

    return plainToInstance(SettingDto, updatedSetting.toObject());
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.settingModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    return result !== null;
  }

  async findAll(tenantId: Types.ObjectId): Promise<SettingDto[]> {
    const settingsModel = await this.settingModel.find({ tenantId }).lean().exec();
    return settingsModel.map((setting) => plainToInstance(SettingDto, setting));
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<SettingDto> {
    const settingModel = await this.settingModel.findOne({ _id: id, tenantId }).lean().exec();
    if (!settingModel) {
      throw new NotFoundException(`Setting with ID "${id}" not found.`);
    }
    return plainToInstance(SettingDto, settingModel);
  }

  async findByName(name: string, tenantId: Types.ObjectId): Promise<SettingDto> {
    let settingModel = await this.settingModel.findOne({ name, tenantId }).lean().exec();
    if (!settingModel) {
      const rootTenantObjectId = toObjectId(this.ROOT_TENANT_ID);
      settingModel = await this.settingModel.findOne({ name, tenantId: rootTenantObjectId }).lean().exec();
      if (!settingModel) {
        throw new NotFoundException(`Setting with name "${name}" not found.`);
      }
    }
    return plainToInstance(SettingDto, settingModel);
  }

  /**
   * Update multiple settings in a single request
   */
  async updateMany(updateSettings: UpdateSettingDto[], tenantId: Types.ObjectId): Promise<SettingDto[]> {
    if (!Array.isArray(updateSettings) || updateSettings.length === 0) {
      throw new BadRequestException('No settings provided for update.');
    }

    const ids = updateSettings.map((s) => s._id);
    const existing = await this.settingModel.find({ _id: { $in: ids }, tenantId }).exec();

    // Ensure all provided ids exist
    const existingMap = new Map(existing.map((e) => [e._id.toString(), e]));

    for (const dto of updateSettings) {
      const found = existingMap.get(dto._id.toString());
      if (!found) {
        throw new NotFoundException(`Setting with ID "${dto._id}" not found.`);
      }

      // If name changed, ensure uniqueness
      if (dto.name !== undefined && dto.name !== found.name) {
        const nameExists = await this.settingModel.findOne({ name: dto.name, tenantId }).lean().exec();
        if (nameExists && nameExists._id.toString() !== dto._id.toString()) {
          throw new BadRequestException(`Setting name "${dto.name}" is already used.`);
        }
      }
    }

    // Prepare bulk operations
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
    return updated.map((s) => plainToInstance(SettingDto, s));
  }

  async findByGroupName(groupName: string, tenantId: Types.ObjectId): Promise<SettingDto[]> {
    const rootTenantObjectId = toObjectId(this.ROOT_TENANT_ID);

    // Query cả tenantId và rootTenant cùng lúc
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
    
    return mergedSettings.map((s) => plainToInstance(SettingDto, s));
  }

  /**
   * Create a setting or update existing one by name for the tenant
   */
  async createOrUpdate(createSettingDto: CreateSettingDto, tenantId: Types.ObjectId): Promise<SettingDto> {
    const { name } = createSettingDto;

    const existing = await this.settingModel.findOne({ name, tenantId }).exec();
    if (existing) {
      // update allowed fields
      existing.value = createSettingDto.value;
      if (createSettingDto.description !== undefined) existing.description = createSettingDto.description;
      if ((createSettingDto as any).groupName !== undefined) existing.groupName = (createSettingDto as any).groupName;
      const saved = await existing.save();
      return plainToInstance(SettingDto, saved.toObject());
    }

    const newSetting = new this.settingModel({ ...createSettingDto, tenantId });
    const saved = await newSetting.save();
    return plainToInstance(SettingDto, saved.toObject());
  }

  /**
   * Bulk create or update settings by name within a tenant.
   * Uses bulkWrite with upsert for efficiency.
   */
  async createOrUpdates(createSettings: CreateSettingDto[], tenantId: Types.ObjectId): Promise<SettingDto[]> {
    if (!Array.isArray(createSettings) || createSettings.length === 0) {
      throw new BadRequestException('No settings provided for createOrUpdates.');
    }

    // Normalize by name - last item wins if duplicate names provided
    const map = new Map<string, CreateSettingDto>();
    for (const s of createSettings) {
      map.set(s.name, s);
    }

    // Ensure tenantId is properly converted to ObjectId
    const normalizedTenantId = new Types.ObjectId(tenantId);

    const ops: any[] = [];
    for (const [name, dto] of map.entries()) {
      const setFields: any = { value: dto.value };
      if (dto.description !== undefined) setFields.description = dto.description;
      if ((dto as any).groupName !== undefined) setFields.groupName = (dto as any).groupName;

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
    return updated.map((s) => plainToInstance(SettingDto, s));
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SettingSortFilter,
    filters: SettingSortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<SearchSettingsRes> {
    const { pipeline, matchForCount } = await this.buildQuerySearchSettings(
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    );

    const items = await this.settingModel.aggregate(pipeline).exec();
    const totalItem = await this.settingModel.countDocuments(matchForCount);

    const settings = items.map((item) => plainToInstance(SettingDto, item));

    return {
      pageIdx,
      settings,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchSettings(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SettingSortFilter,
    filters: SettingSortFilter[],
    tenantId: Types.ObjectId,
  ) {
    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;

    const match: any = { tenantId };
    const ands: any[] = [];

    if (keyword) {
      ands.push({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { groupName: { $regex: keyword, $options: 'i' } },
          { value: { $regex: keyword, $options: 'i' } },
        ],
      });
    }

    let startDateValue: Date | null = null;
    let endDateValue: Date | null = null;

    if (Array.isArray(filters)) {
      for (const { key, value } of filters) {
        if (!key || value == null || (Array.isArray(value) && value.length === 0)) continue;

        if (key === 'startDate') {
          const dateValue = getFirstValue(value);
          startDateValue = new Date(dateValue);
        } else if (key === 'endDate') {
          const dateValue = getFirstValue(value);
          endDateValue = new Date(dateValue);
        } else if (key === 'phoneNumber') {
          const phoneValue = getFirstValue(value);
          ands.push({ 'userInfo.phoneNumber': { $regex: phoneValue, $options: 'i' } });
        } else {
          // Sử dụng hàm helper để xử lý filter
          ands.push(processFilterValue(key, value));
        }
      }
    }

    if (startDateValue || endDateValue) {
      const range: any = {};
      if (startDateValue) range.$gte = startDateValue;
      if (endDateValue) range.$lte = endDateValue;
      ands.push({ createdAt: range });
    }

    if (ands.length) match.$and = ands;

    const pipeline: any[] = [{ $match: match }];

    if (sortBy?.key) {
      const sortValue = getFirstValue(sortBy.value);
      pipeline.push({ $sort: { [sortBy.key]: sortValue === 'ascend' ? 1 : -1 } });
    }

    pipeline.push({ $skip: skip }, { $limit: pageSize });

    return { pipeline, matchForCount: match };
  }
}

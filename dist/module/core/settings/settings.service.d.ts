import { Model, Types } from 'mongoose';
import { Setting } from './schema/setting.schema';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingDto, SearchSettingsRes, SettingSortFilter } from './dto/setting.dto';
export declare class SettingsService {
    private settingModel;
    ROOT_TENANT_ID: string;
    constructor(settingModel: Model<Setting>);
    create(createSettingDto: CreateSettingDto, tenantId: Types.ObjectId): Promise<SettingDto>;
    update(updateSettingDto: UpdateSettingDto, tenantId: Types.ObjectId): Promise<SettingDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantId: Types.ObjectId): Promise<SettingDto[]>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<SettingDto>;
    findByName(name: string, tenantId: Types.ObjectId): Promise<SettingDto>;
    getAppVersion(tenantId?: Types.ObjectId): Promise<string>;
    updateMany(updateSettings: UpdateSettingDto[], tenantId: Types.ObjectId): Promise<SettingDto[]>;
    findByGroupName(groupName: string, tenantId: Types.ObjectId): Promise<SettingDto[]>;
    createsOrUpdates(createSettingDto: CreateSettingDto[], tenantId: Types.ObjectId): Promise<SettingDto[]>;
    createOrUpdate(createSettingDto: CreateSettingDto, tenantId: Types.ObjectId): Promise<SettingDto>;
    createOrUpdates(createSettings: CreateSettingDto[], tenantId: Types.ObjectId): Promise<SettingDto[]>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SettingSortFilter, filters: SettingSortFilter[], tenantId: Types.ObjectId): Promise<SearchSettingsRes>;
    buildQuerySearchSettings(pageIdx: number, pageSize: number, keyword: string, sortBy: SettingSortFilter, filters: SettingSortFilter[], tenantId: Types.ObjectId): Promise<{
        pipeline: any[];
        matchForCount: any;
    }>;
}

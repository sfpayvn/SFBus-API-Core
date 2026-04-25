import { SettingsService } from '../../core/settings/settings.service';
import { SettingDto } from '../../core/settings/dto/setting.dto';
import { Types } from 'mongoose';
export declare class ClientSettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findByGroup(groupName: string, tenantId: Types.ObjectId): Promise<SettingDto[]>;
    findAll(tenantId: Types.ObjectId): Promise<SettingDto[]>;
    findByName(name: string, tenantId: Types.ObjectId): Promise<SettingDto>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<SettingDto>;
}

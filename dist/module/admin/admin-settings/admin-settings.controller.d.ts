import { SettingsService } from '../../core/settings/settings.service';
import { AdminCreateSettingDto } from './dto/admin-create-setting.dto';
import { AdminUpdateSettingDto } from './dto/admin-update-setting.dto';
import { SettingDto, SearchSettingsRes, SearchSettingsPagingQuery } from '../../core/settings/dto/setting.dto';
import { Types } from 'mongoose';
import { UserDto } from '../../core/user/user/dto/user.dto';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
export declare class AdminSettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    create(createSettingDto: AdminCreateSettingDto, user: UserDto): Promise<SettingDto>;
    createOrUpdate(createSettingDto: AdminCreateSettingDto, user: UserDto): Promise<SettingDto>;
    createOrUpdates(createSettingsDto: AdminCreateSettingDto[], user: UserDto): Promise<SettingDto[]>;
    update(updateSettingDto: AdminUpdateSettingDto, user: UserDto): Promise<SettingDto>;
    updateMany(updateSettingDtos: AdminUpdateSettingDto[], user: UserDto): Promise<SettingDto[]>;
    findByGroup(groupName: string, user: UserDto): Promise<SettingDto[]>;
    delete(id: Types.ObjectId, user: UserDto): Promise<{
        success: boolean;
    }>;
    findAll(user: UserDto): Promise<SettingDto[]>;
    findByName(name: string, user: UserDto): Promise<SettingDto>;
    findOne(id: Types.ObjectId, user: UserDto): Promise<SettingDto>;
    search(query: SearchSettingsPagingQuery, user: UserTokenDto): Promise<SearchSettingsRes>;
}

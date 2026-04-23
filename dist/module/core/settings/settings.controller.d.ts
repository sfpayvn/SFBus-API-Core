import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingDto } from './dto/setting.dto';
import { Types } from 'mongoose';
import { UserDto } from '../user/user/dto/user.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    create(createSettingDto: CreateSettingDto, user: UserDto): Promise<SettingDto>;
    update(updateSettingDto: UpdateSettingDto, user: UserDto): Promise<SettingDto>;
    createOrUpdate(createSettingDto: CreateSettingDto, user: UserDto): Promise<SettingDto>;
    createOrUpdates(createSettingsDto: CreateSettingDto[], user: UserDto): Promise<SettingDto[]>;
    updateMany(updateSettingDtos: UpdateSettingDto[], user: UserDto): Promise<SettingDto[]>;
    delete(id: Types.ObjectId, user: UserDto): Promise<{
        success: boolean;
    }>;
    findAll(user: UserDto): Promise<SettingDto[]>;
    findByGroup(groupName: string, user: UserDto): Promise<SettingDto[]>;
    findByName(name: string, user: UserDto): Promise<SettingDto>;
    findOne(id: Types.ObjectId, user: UserDto): Promise<SettingDto>;
}

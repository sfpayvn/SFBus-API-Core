import { SettingsService } from '../../core/settings/settings.service';
import { SettingDto } from '../../core/settings/dto/setting.dto';
import { Types } from 'mongoose';
import { UserDto } from '../../core/user/user/dto/user.dto';
export declare class PosSettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findByGroup(groupName: string, user: UserDto): Promise<SettingDto[]>;
    findAll(user: UserDto): Promise<SettingDto[]>;
    findByName(name: string, user: UserDto): Promise<SettingDto>;
    findOne(id: Types.ObjectId, user: UserDto): Promise<SettingDto>;
}

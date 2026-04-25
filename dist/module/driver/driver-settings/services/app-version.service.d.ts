import { SettingsService } from '../../../core/settings/settings.service';
import { Types } from 'mongoose';
export declare class DriverAppVersionService {
    private readonly settingsService;
    private ROOT_TENANT_ID;
    constructor(settingsService: SettingsService);
    getAppVersion(): Promise<string>;
    getAppVersionForTenant(tenantId: Types.ObjectId): Promise<string>;
}

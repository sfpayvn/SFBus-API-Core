import { Types } from 'mongoose';
export declare class AdminCreateTenantSettingDto {
    appearance: string;
    timezone: string;
}
export declare class AdminCreateTenantDto {
    code: string;
    name: string;
    phoneNumber: string;
    email?: string;
    address?: string;
    logoId?: Types.ObjectId;
    setting?: AdminCreateTenantSettingDto;
    status: string;
}

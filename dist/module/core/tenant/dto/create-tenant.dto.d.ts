import { Types } from 'mongoose';
export declare class CreateTenantSettingDto {
    appearance: string;
    timezone: string;
}
export declare class CreateTenantDto {
    code: string;
    name: string;
    phoneNumber: string;
    email?: string;
    address?: string;
    logoId?: Types.ObjectId;
    setting?: CreateTenantSettingDto;
    status: string;
}

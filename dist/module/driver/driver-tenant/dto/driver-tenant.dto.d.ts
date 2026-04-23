import { Types } from 'mongoose';
export declare class DriverTenantSettingDto {
    readonly appearance: string;
    readonly timezone: string;
}
export declare class DriverTenantDto {
    readonly _id: Types.ObjectId;
    readonly code: string;
    readonly name: string;
    readonly phoneNumber: string;
    readonly email?: string;
    readonly address?: string;
    readonly logo?: string;
    readonly setting: DriverTenantSettingDto;
    subscriptionId?: Types.ObjectId;
    readonly status?: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class DriverSearchTenantQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchTenantQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchTenantQuerySortFilter;
    filters: DriverSearchTenantQuerySortFilter[];
}
export declare class DriverSearchTenantsRes {
    pageIdx: number;
    tenants: DriverTenantDto[];
    totalPage: number;
    totalItem: number;
}

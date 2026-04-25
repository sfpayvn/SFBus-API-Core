import { Types } from 'mongoose';
export declare class ClientTenantSettingDto {
    readonly appearance: string;
    readonly timezone: string;
}
export declare class ClientTenantDto {
    readonly _id: Types.ObjectId;
    readonly code: string;
    readonly name: string;
    readonly phoneNumber: string;
    readonly email?: string;
    readonly address?: string;
    readonly logo?: string;
    readonly setting: ClientTenantSettingDto;
    subscriptionId?: Types.ObjectId;
    readonly status?: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class ClientSearchTenantQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchTenantQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchTenantQuerySortFilter;
    filters: ClientSearchTenantQuerySortFilter[];
}
export declare class ClientSearchTenantsRes {
    pageIdx: number;
    tenants: ClientTenantDto[];
    totalPage: number;
    totalItem: number;
}

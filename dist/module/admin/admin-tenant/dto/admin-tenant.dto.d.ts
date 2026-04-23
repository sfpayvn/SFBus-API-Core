import { Types } from 'mongoose';
export declare class AdminTenantSettingDto {
    appearance: string;
    timezone: string;
}
export declare class AdminTenantDto {
    _id: Types.ObjectId;
    subscriptionId: Types.ObjectId;
    code: string;
    name: string;
    phoneNumber: string;
    email: string;
    address?: string;
    logoId?: string;
    logo?: string;
    setting: AdminTenantSettingDto;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class AdminSearchTenantQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchTenantQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchTenantQuerySortFilter;
    filters: AdminSearchTenantQuerySortFilter[];
}
export declare class AdminSearchTenantsRes {
    pageIdx: number;
    tenants: AdminTenantDto[];
    totalPage: number;
    totalItem: number;
}

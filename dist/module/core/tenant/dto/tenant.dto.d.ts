import { Types } from 'mongoose';
export declare class TenantSettingDto {
    appearance: string;
    timezone: string;
}
export declare class TenantDto {
    _id: Types.ObjectId;
    subscriptionId: Types.ObjectId;
    code: string;
    name: string;
    phoneNumber: string;
    email: string;
    address?: string;
    logoId?: string;
    logo?: string;
    setting?: TenantSettingDto;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class SearchTenantQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchTenantQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchTenantQuerySortFilter;
    filters: SearchTenantQuerySortFilter[];
}
export declare class SearchTenantsRes {
    pageIdx: number;
    tenants: TenantDto[];
    totalPage: number;
    totalItem: number;
}

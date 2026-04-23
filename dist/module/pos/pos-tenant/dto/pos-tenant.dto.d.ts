import { Types } from 'mongoose';
export declare class PosTenantSettingDto {
    readonly appearance: string;
    readonly timezone: string;
}
export declare class PosTenantDto {
    readonly _id: Types.ObjectId;
    readonly code: string;
    readonly name: string;
    readonly phoneNumber: string;
    readonly email?: string;
    readonly address?: string;
    readonly logo?: string;
    readonly setting: PosTenantSettingDto;
    subscriptionId?: Types.ObjectId;
    readonly status?: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class PosSearchTenantQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchTenantQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchTenantQuerySortFilter;
    filters: PosSearchTenantQuerySortFilter[];
}
export declare class PosSearchTenantsRes {
    pageIdx: number;
    tenants: PosTenantDto[];
    totalPage: number;
    totalItem: number;
}

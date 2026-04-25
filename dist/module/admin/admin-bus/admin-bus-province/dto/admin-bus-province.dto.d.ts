import { Types } from 'mongoose';
export declare class AdminBusProvinceDto {
    readonly _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    readonly name: string;
    isDefault?: boolean;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
export declare class AdminSearchBusProvincesQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchBusProvincesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchBusProvincesQuerySortFilter;
    filters: AdminSearchBusProvincesQuerySortFilter[];
}
export declare class AdminSearchBusProvincesRes {
    pageIdx: number;
    busProvinces: AdminBusProvinceDto[];
    totalPage: number;
    totalItem: number;
}

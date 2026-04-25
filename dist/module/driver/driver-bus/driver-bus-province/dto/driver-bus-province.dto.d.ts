import { Types } from 'mongoose';
export declare class DriverBusProvinceDto {
    readonly _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    readonly name: string;
    isDefault?: boolean;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
export declare class DriverSearchBusProvincesQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchBusProvincesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchBusProvincesQuerySortFilter;
    filters: DriverSearchBusProvincesQuerySortFilter[];
}
export declare class DriverSearchBusProvincesRes {
    pageIdx: number;
    busProvinces: DriverBusProvinceDto[];
    totalPage: number;
    totalItem: number;
}

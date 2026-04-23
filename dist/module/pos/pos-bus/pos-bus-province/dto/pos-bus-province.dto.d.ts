import { Types } from 'mongoose';
export declare class PosBusProvinceDto {
    readonly _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    readonly name: string;
    isDefault?: boolean;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
export declare class PosSearchBusProvincesQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchBusProvincesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchBusProvincesQuerySortFilter;
    filters: PosSearchBusProvincesQuerySortFilter[];
}
export declare class PosSearchBusProvincesRes {
    pageIdx: number;
    busProvinces: PosBusProvinceDto[];
    totalPage: number;
    totalItem: number;
}

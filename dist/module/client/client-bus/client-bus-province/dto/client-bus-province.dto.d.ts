import { Types } from 'mongoose';
export declare class ClientBusProvinceDto {
    readonly _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    readonly name: string;
    isDefault?: boolean;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
export declare class ClientSearchBusProvincesQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchBusProvincesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchBusProvincesQuerySortFilter;
    filters: ClientSearchBusProvincesQuerySortFilter[];
}
export declare class ClientSearchBusProvincesRes {
    pageIdx: number;
    busProvinces: ClientBusProvinceDto[];
    totalPage: number;
    totalItem: number;
}

import { Types } from 'mongoose';
export declare class DriverBusTypeDto {
    readonly _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    readonly name: string;
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class DriverSearchBusTypesQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchBusTypesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchBusTypesQuerySortFilter;
    filters: DriverSearchBusTypesQuerySortFilter[];
}
export declare class DriverSearchBusTypesRes {
    pageIdx: number;
    busTypes: DriverBusTypeDto[];
    totalPage: number;
    totalItem: number;
}

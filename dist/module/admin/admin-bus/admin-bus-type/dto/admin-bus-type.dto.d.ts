import { Types } from 'mongoose';
export declare class AdminBusTypeDto {
    readonly _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    readonly name: string;
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class AdminSearchBusTypesQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchBusTypesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchBusTypesQuerySortFilter;
    filters: AdminSearchBusTypesQuerySortFilter[];
}
export declare class AdminSearchBusTypesRes {
    pageIdx: number;
    busTypes: AdminBusTypeDto[];
    totalPage: number;
    totalItem: number;
}

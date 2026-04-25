import { Types } from 'mongoose';
export declare class PosBusTypeDto {
    readonly _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    readonly name: string;
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class PosSearchBusTypesQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchBusTypesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchBusTypesQuerySortFilter;
    filters: PosSearchBusTypesQuerySortFilter[];
}
export declare class PosSearchBusTypesRes {
    pageIdx: number;
    busTypes: PosBusTypeDto[];
    totalPage: number;
    totalItem: number;
}

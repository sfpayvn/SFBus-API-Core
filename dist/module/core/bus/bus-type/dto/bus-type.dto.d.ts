import { Types } from 'mongoose';
export declare class BusTypeDto {
    readonly _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    readonly name: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class SearchBusTypesQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchBusTypesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchBusTypesQuerySortFilter;
    filters: SearchBusTypesQuerySortFilter[];
}
export declare class SearchBusTypesRes {
    pageIdx: number;
    busTypes: BusTypeDto[];
    totalPage: number;
    totalItem: number;
}

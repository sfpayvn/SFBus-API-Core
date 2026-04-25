import { Types } from 'mongoose';
export declare class ClientBusTypeDto {
    readonly _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    readonly name: string;
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class ClientSearchBusTypesQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchBusTypesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchBusTypesQuerySortFilter;
    filters: ClientSearchBusTypesQuerySortFilter[];
}
export declare class ClientSearchBusTypesRes {
    pageIdx: number;
    busTypes: ClientBusTypeDto[];
    totalPage: number;
    totalItem: number;
}

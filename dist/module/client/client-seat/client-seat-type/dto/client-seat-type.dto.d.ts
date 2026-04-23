import { Types } from 'mongoose';
export declare class ClientSeatTypeDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    icon: string;
    iconId: Types.ObjectId;
    isEnv: boolean;
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class ClientSearchSeatTypesQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchSeatTypesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchSeatTypesQuerySortFilter;
    filters: ClientSearchSeatTypesQuerySortFilter[];
}
export declare class ClientSearchSeatTypeRes {
    pageIdx: number;
    seatTypes: ClientSeatTypeDto[];
    totalPage: number;
    totalItem: number;
}

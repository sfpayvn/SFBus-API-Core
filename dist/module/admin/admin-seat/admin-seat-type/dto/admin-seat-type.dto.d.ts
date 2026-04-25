import { Types } from 'mongoose';
export declare class AdminSeatTypeDto {
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
export declare class AdminSearchSeatTypesQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchSeatTypesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchSeatTypesQuerySortFilter;
    filters: AdminSearchSeatTypesQuerySortFilter[];
}
export declare class AdminSearchSeatTypeRes {
    pageIdx: number;
    seatTypes: AdminSeatTypeDto[];
    totalPage: number;
    totalItem: number;
}

import { Types } from 'mongoose';
export declare class PosSeatTypeDto {
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
export declare class PosSearchSeatTypesQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchSeatTypesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchSeatTypesQuerySortFilter;
    filters: PosSearchSeatTypesQuerySortFilter[];
}
export declare class PosSearchSeatTypeRes {
    pageIdx: number;
    seatTypes: PosSeatTypeDto[];
    totalPage: number;
    totalItem: number;
}

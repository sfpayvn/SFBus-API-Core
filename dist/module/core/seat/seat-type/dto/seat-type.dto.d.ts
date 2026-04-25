import { Types } from 'mongoose';
export declare class SeatTypeDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    icon: string;
    iconId: Types.ObjectId;
    isEnv: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class SearchSeatTypeQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchSeatTypeQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchSeatTypeQuerySortFilter;
    filters: SearchSeatTypeQuerySortFilter[];
}
export declare class SearchSeatTypeRes {
    pageIdx: number;
    seatTypes: SeatTypeDto[];
    totalPage: number;
    totalItem: number;
}

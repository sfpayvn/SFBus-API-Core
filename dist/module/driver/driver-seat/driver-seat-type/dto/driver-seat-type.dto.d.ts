import { Types } from 'mongoose';
export declare class DriverSeatTypeDto {
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
export declare class DriverSearchSeatTypesQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchSeatTypesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchSeatTypesQuerySortFilter;
    filters: DriverSearchSeatTypesQuerySortFilter[];
}
export declare class DriverSearchSeatTypeRes {
    pageIdx: number;
    seatTypes: DriverSeatTypeDto[];
    totalPage: number;
    totalItem: number;
}

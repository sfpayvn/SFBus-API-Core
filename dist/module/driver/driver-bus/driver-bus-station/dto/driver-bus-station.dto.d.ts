import { Types } from 'mongoose';
export declare class DriverBusStationDto {
    readonly _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    readonly name: string;
    readonly detailAddress: string;
    readonly location: string;
    readonly provinceId: Types.ObjectId;
    readonly imageId?: Types.ObjectId;
    readonly image?: any;
    isDefault?: boolean;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
export declare class DriverSearchBusStationsQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchBusStationsQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchBusStationsQuerySortFilter;
    filters: DriverSearchBusStationsQuerySortFilter[];
}
export declare class DriverSearchBusStationsRes {
    pageIdx: number;
    busStations: DriverBusStationDto[];
    totalPage: number;
    totalItem: number;
}

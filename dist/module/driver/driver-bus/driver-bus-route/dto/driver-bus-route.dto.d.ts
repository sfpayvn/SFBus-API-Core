import { Types } from 'mongoose';
export declare class DriverBusRouteDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    breakPoints: DriverBusRouteBreakPointsDto[];
    distance: number;
    distanceTime: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class DriverBusRouteBreakPointsDto {
    busStationId: Types.ObjectId;
}
export declare class DriverSearchBusRouteQuerySortFilter {
    key: string;
    value: string;
}
export declare class DriverSearchBusRouteQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: DriverSearchBusRouteQuerySortFilter;
    filters: DriverSearchBusRouteQuerySortFilter[];
}
export declare class DriverSearchBusRouteRes {
    pageIdx: number;
    busRoutes: DriverBusRouteDto[];
    totalPage: number;
    totalItem: number;
}

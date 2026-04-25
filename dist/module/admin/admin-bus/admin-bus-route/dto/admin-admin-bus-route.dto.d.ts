import { Types } from 'mongoose';
export declare class AdminBusRouteDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    breakPoints: AdminBusRouteBreakPointsDto[];
    distance: number;
    distanceTime: string;
    notes?: string;
    isDefault?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class AdminBusRouteBreakPointsDto {
    busStationId: Types.ObjectId;
}
export declare class AdminSearchBusRouteQuerySortFilter {
    key: string;
    value: string;
}
export declare class AdminSearchBusRouteQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchBusRouteQuerySortFilter;
    filters: AdminSearchBusRouteQuerySortFilter[];
}
export declare class AdminSearchBusRouteRes {
    pageIdx: number;
    busRoutes: AdminBusRouteDto[];
    totalPage: number;
    totalItem: number;
}

import { Types } from 'mongoose';
export declare class ClientBusRouteDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    breakPoints: ClientBusRouteBreakPointsDto[];
    distance: number;
    distanceTime: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class ClientBusRouteBreakPointsDto {
    busStationId: Types.ObjectId;
}
export declare class ClientSearchBusRouteQuerySortFilter {
    key: string;
    value: string;
}
export declare class ClientSearchBusRouteQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: ClientSearchBusRouteQuerySortFilter;
    filters: ClientSearchBusRouteQuerySortFilter[];
}
export declare class ClientSearchBusRouteRes {
    pageIdx: number;
    busRoutes: ClientBusRouteDto[];
    totalPage: number;
    totalItem: number;
}

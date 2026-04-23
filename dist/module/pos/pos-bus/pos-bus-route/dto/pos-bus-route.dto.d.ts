import { Types } from 'mongoose';
export declare class PosBusRouteDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    breakPoints: PosBusRouteBreakPointsDto[];
    distance: number;
    distanceTime: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class PosBusRouteBreakPointsDto {
    busStationId: Types.ObjectId;
}
export declare class PosSearchBusRouteQuerySortFilter {
    key: string;
    value: string;
}
export declare class PosSearchBusRouteQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: PosSearchBusRouteQuerySortFilter;
    filters: PosSearchBusRouteQuerySortFilter[];
}
export declare class PosSearchBusRouteRes {
    pageIdx: number;
    busRoutes: PosBusRouteDto[];
    totalPage: number;
    totalItem: number;
}

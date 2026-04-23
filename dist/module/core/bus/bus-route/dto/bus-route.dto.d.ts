import { Types } from 'mongoose';
import { BusStationDto } from '../../bus-station/dto/bus-station.dto';
export declare class BusRouteDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    name: string;
    breakPoints: BusRouteBreakPointsDto[];
    distance: number;
    distanceTime: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class BusRouteBreakPointsDto {
    busStationId: Types.ObjectId;
    busStation?: BusStationDto;
}
export declare class SearchBusRouteQuerySortFilter {
    key: string;
    value: string;
}
export declare class SearchBusRouteQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchBusRouteQuerySortFilter;
    filters: SearchBusRouteQuerySortFilter[];
}
export declare class SearchBusRouteRes {
    pageIdx: number;
    busRoutes: BusRouteDto[];
    totalPage: number;
    totalItem: number;
}

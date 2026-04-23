import { Types } from 'mongoose';
export declare class CreateBusRouteDto {
    name: string;
    breakPoints: CreateBusRouteBreakPointsDto[];
    distance: number;
    distanceTime: string;
    notes?: string;
}
export declare class CreateBusRouteBreakPointsDto {
    busStationId: Types.ObjectId;
}

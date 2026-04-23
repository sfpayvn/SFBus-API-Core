import { Types } from 'mongoose';
export declare class AdminCreateBusRouteDto {
    name: string;
    breakPoints: AdminCreateBusRouteBreakPointsDto[];
    distance: number;
    distanceTime: string;
    notes?: string;
}
export declare class AdminCreateBusRouteBreakPointsDto {
    busStationId: Types.ObjectId;
}

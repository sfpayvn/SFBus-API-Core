import { Types, Document } from 'mongoose';
export declare class BusRouteBreakPointsDocument {
    busStationId: Types.ObjectId;
}
export declare const BusRouteBreakPointsSchema: import("mongoose").Schema<BusRouteBreakPointsDocument, import("mongoose").Model<BusRouteBreakPointsDocument, any, any, any, Document<unknown, any, BusRouteBreakPointsDocument> & BusRouteBreakPointsDocument & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BusRouteBreakPointsDocument, Document<unknown, {}, import("mongoose").FlatRecord<BusRouteBreakPointsDocument>> & import("mongoose").FlatRecord<BusRouteBreakPointsDocument> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class BusRouteDocument extends Document {
    tenantId: Types.ObjectId;
    name: string;
    breakPoints: BusRouteBreakPointsDocument[];
    distance: number;
    distanceTime: string;
    notes: string;
}
export declare const BusRouteSchema: import("mongoose").Schema<BusRouteDocument, import("mongoose").Model<BusRouteDocument, any, any, any, Document<unknown, any, BusRouteDocument> & BusRouteDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BusRouteDocument, Document<unknown, {}, import("mongoose").FlatRecord<BusRouteDocument>> & import("mongoose").FlatRecord<BusRouteDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

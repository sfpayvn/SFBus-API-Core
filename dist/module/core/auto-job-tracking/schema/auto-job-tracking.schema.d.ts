import { Document, Types } from 'mongoose';
export type AutoJobTrackingDocument = AutoJobTracking & Document;
export declare class AutoJobTracking {
    tenantId: Types.ObjectId;
    jobName: string;
    runDate: string;
    createdAt: Date;
}
export declare const AutoJobTrackingSchema: import("mongoose").Schema<AutoJobTracking, import("mongoose").Model<AutoJobTracking, any, any, any, Document<unknown, any, AutoJobTracking> & AutoJobTracking & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AutoJobTracking, Document<unknown, {}, import("mongoose").FlatRecord<AutoJobTracking>> & import("mongoose").FlatRecord<AutoJobTracking> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;

import { Document, Types } from 'mongoose';
export declare class TrackingDocument extends Document {
    tenantId: Types.ObjectId;
    type: string;
    platform: string;
    metadata: Record<string, any>;
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedBy: Types.ObjectId;
}
export declare const TrackingSchema: import("mongoose").Schema<TrackingDocument, import("mongoose").Model<TrackingDocument, any, any, any, Document<unknown, any, TrackingDocument> & TrackingDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TrackingDocument, Document<unknown, {}, import("mongoose").FlatRecord<TrackingDocument>> & import("mongoose").FlatRecord<TrackingDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

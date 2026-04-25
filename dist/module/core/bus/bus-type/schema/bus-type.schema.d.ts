import { Document, Types } from 'mongoose';
export declare class BusTypeDocument extends Document {
    tenantId: Types.ObjectId;
    name: string;
}
export declare const BusTypeSchema: import("mongoose").Schema<BusTypeDocument, import("mongoose").Model<BusTypeDocument, any, any, any, Document<unknown, any, BusTypeDocument> & BusTypeDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BusTypeDocument, Document<unknown, {}, import("mongoose").FlatRecord<BusTypeDocument>> & import("mongoose").FlatRecord<BusTypeDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

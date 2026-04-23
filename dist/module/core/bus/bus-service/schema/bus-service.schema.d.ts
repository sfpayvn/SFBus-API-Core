import { Document, Types } from 'mongoose';
export declare class BusServiceDocument extends Document {
    tenantId: Types.ObjectId;
    name: string;
    iconId: Types.ObjectId;
}
export declare const BusServiceSchema: import("mongoose").Schema<BusServiceDocument, import("mongoose").Model<BusServiceDocument, any, any, any, Document<unknown, any, BusServiceDocument> & BusServiceDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BusServiceDocument, Document<unknown, {}, import("mongoose").FlatRecord<BusServiceDocument>> & import("mongoose").FlatRecord<BusServiceDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

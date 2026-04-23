import { Document, Types } from 'mongoose';
export declare class SeatTypeDocument extends Document {
    tenantId: Types.ObjectId;
    name: string;
    iconId: Types.ObjectId;
    isEnv: boolean;
}
export declare const SeatTypeSchema: import("mongoose").Schema<SeatTypeDocument, import("mongoose").Model<SeatTypeDocument, any, any, any, Document<unknown, any, SeatTypeDocument> & SeatTypeDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SeatTypeDocument, Document<unknown, {}, import("mongoose").FlatRecord<SeatTypeDocument>> & import("mongoose").FlatRecord<SeatTypeDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

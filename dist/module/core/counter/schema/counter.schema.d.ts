import { Document, Types } from 'mongoose';
export declare class CounterDocument extends Document {
    tenantId: Types.ObjectId;
    seatCounter: number;
}
export declare const CounterSchema: import("mongoose").Schema<CounterDocument, import("mongoose").Model<CounterDocument, any, any, any, Document<unknown, any, CounterDocument> & CounterDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CounterDocument, Document<unknown, {}, import("mongoose").FlatRecord<CounterDocument>> & import("mongoose").FlatRecord<CounterDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

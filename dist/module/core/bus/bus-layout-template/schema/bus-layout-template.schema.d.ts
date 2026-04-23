import { Document, Types } from 'mongoose';
export declare class SeatDocument extends Document {
    index: number;
    typeId: Types.ObjectId;
    name: string;
    status: string;
}
export declare class BusSeatLayoutTemplateDocument extends Document {
    name: string;
    seats: SeatDocument[];
}
export declare class BusLayoutTemplateDocument extends Document {
    tenantId: Types.ObjectId;
    name: string;
    seatLayouts: BusSeatLayoutTemplateDocument[];
}
export declare const BusLayoutTemplateSchema: import("mongoose").Schema<BusLayoutTemplateDocument, import("mongoose").Model<BusLayoutTemplateDocument, any, any, any, Document<unknown, any, BusLayoutTemplateDocument> & BusLayoutTemplateDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BusLayoutTemplateDocument, Document<unknown, {}, import("mongoose").FlatRecord<BusLayoutTemplateDocument>> & import("mongoose").FlatRecord<BusLayoutTemplateDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

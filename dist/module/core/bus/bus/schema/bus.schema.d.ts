import { Document, Types } from 'mongoose';
export declare class BusDocument extends Document {
    tenantId: Types.ObjectId;
    name: string;
    licensePlate: string;
    description?: string;
    busTemplateId: Types.ObjectId;
}
export declare const BusSchema: import("mongoose").Schema<BusDocument, import("mongoose").Model<BusDocument, any, any, any, Document<unknown, any, BusDocument> & BusDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BusDocument, Document<unknown, {}, import("mongoose").FlatRecord<BusDocument>> & import("mongoose").FlatRecord<BusDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

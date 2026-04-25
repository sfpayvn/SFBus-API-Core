import { Document, Types } from 'mongoose';
export declare class BusTemplateDocument extends Document {
    tenantId: Types.ObjectId;
    name: string;
    busServiceIds: Types.ObjectId[];
    busTypeId: Types.ObjectId;
    busLayoutTemplateId: Types.ObjectId;
}
export declare const BusTemplateSchema: import("mongoose").Schema<BusTemplateDocument, import("mongoose").Model<BusTemplateDocument, any, any, any, Document<unknown, any, BusTemplateDocument> & BusTemplateDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BusTemplateDocument, Document<unknown, {}, import("mongoose").FlatRecord<BusTemplateDocument>> & import("mongoose").FlatRecord<BusTemplateDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

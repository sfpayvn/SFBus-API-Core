import { Document, Types } from 'mongoose';
export declare class BusProvinceDocument extends Document {
    tenantId: Types.ObjectId;
    name: string;
    isActive?: boolean;
}
export declare const BusProvinceSchema: import("mongoose").Schema<BusProvinceDocument, import("mongoose").Model<BusProvinceDocument, any, any, any, Document<unknown, any, BusProvinceDocument> & BusProvinceDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BusProvinceDocument, Document<unknown, {}, import("mongoose").FlatRecord<BusProvinceDocument>> & import("mongoose").FlatRecord<BusProvinceDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

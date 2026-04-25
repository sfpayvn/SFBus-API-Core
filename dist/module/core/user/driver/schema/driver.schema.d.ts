import { Document, Types } from 'mongoose';
export declare class DriverDocument extends Document {
    userId: Types.ObjectId;
    tenantId: Types.ObjectId;
    licenseNumber: string;
    licenseExpirationDate: Date;
    licenseType: string;
    licenseImage: string;
}
export declare const DriverSchema: import("mongoose").Schema<DriverDocument, import("mongoose").Model<DriverDocument, any, any, any, Document<unknown, any, DriverDocument> & DriverDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DriverDocument, Document<unknown, {}, import("mongoose").FlatRecord<DriverDocument>> & import("mongoose").FlatRecord<DriverDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

import { Document, Types } from 'mongoose';
export declare class TenantSettingSubDocument {
    appearance: string;
    timezone: string;
}
export declare const TenantSettingSchema: import("mongoose").Schema<TenantSettingSubDocument, import("mongoose").Model<TenantSettingSubDocument, any, any, any, Document<unknown, any, TenantSettingSubDocument> & TenantSettingSubDocument & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TenantSettingSubDocument, Document<unknown, {}, import("mongoose").FlatRecord<TenantSettingSubDocument>> & import("mongoose").FlatRecord<TenantSettingSubDocument> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class TenantDocument extends Document {
    name: string;
    code: string;
    phoneNumber: string;
    email: string;
    address: string;
    logoId?: Types.ObjectId;
    setting: TenantSettingSubDocument;
    status: string;
}
export declare const TenantSchema: import("mongoose").Schema<TenantDocument, import("mongoose").Model<TenantDocument, any, any, any, Document<unknown, any, TenantDocument> & TenantDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TenantDocument, Document<unknown, {}, import("mongoose").FlatRecord<TenantDocument>> & import("mongoose").FlatRecord<TenantDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

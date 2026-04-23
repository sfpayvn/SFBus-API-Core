import { Document, Types } from 'mongoose';
export declare class Setting extends Document {
    _id: Types.ObjectId;
    name: string;
    value: string;
    description?: string;
    groupName?: string;
    tenantId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const SettingSchema: import("mongoose").Schema<Setting, import("mongoose").Model<Setting, any, any, any, Document<unknown, any, Setting> & Setting & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Setting, Document<unknown, {}, import("mongoose").FlatRecord<Setting>> & import("mongoose").FlatRecord<Setting> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;

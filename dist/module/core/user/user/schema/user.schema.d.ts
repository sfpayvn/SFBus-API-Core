import { Document, Types } from 'mongoose';
export declare class UserAddressDocument extends Document {
    _id: Types.ObjectId;
    type: string;
    addressType: string;
    isDefault: boolean;
}
export declare class UserDocument extends Document {
    tenantId: Types.ObjectId;
    phoneNumber: string;
    password: string;
    avatarId: Types.ObjectId;
    name: string;
    addresses?: UserAddressDocument[];
    gender: string;
    email: string;
    birthdate?: Date;
    roles: string[];
    isTempPassWord: boolean;
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
    isLocked: boolean;
    isDeleted: boolean;
    resetTokenVersion: number;
    tokenVersion: number;
}
export declare const UserSchema: import("mongoose").Schema<UserDocument, import("mongoose").Model<UserDocument, any, any, any, Document<unknown, any, UserDocument> & UserDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserDocument, Document<unknown, {}, import("mongoose").FlatRecord<UserDocument>> & import("mongoose").FlatRecord<UserDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

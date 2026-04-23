import { Types } from 'mongoose';
export declare class PosUserAddressDto {
    _id: Types.ObjectId;
    addressType: string;
    address: string;
    isDefault: boolean;
}
export declare class PosUserDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    avatar: string;
    avatarId: string;
    password: string;
    name: string;
    addresses?: PosUserAddressDto[];
    gender: string;
    email: string;
    phoneNumber: string;
    birthdate?: Date;
    roles: string[];
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
    isLocked: boolean;
    resetTokenVersion: number;
    isDeleted: boolean;
    createdAt: Date;
    isTempPassWord: boolean;
    tokenVersion?: number;
    updatedAt: Date;
    __v: number;
}
export declare class PosSearchUsersTypesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: {
        key: string;
        value: string;
    };
    filters: {
        key: string;
        value: string[];
    };
}
export declare class PosSearchUsersRes {
    pageIdx: number;
    users: PosUserDto[];
    totalPage: number;
    totalItem: number;
}
export declare class PosRequestUpdateUserFieldDto {
    userId: Types.ObjectId;
    fieldName: string;
    value: any;
}

import { Types } from 'mongoose';
export declare class AdminCreateUserAddressDto {
    addressType: string;
    address: string;
    isDefault: boolean;
}
export declare class AdminCreateUserDto {
    tenantId: Types.ObjectId;
    phoneNumber: string;
    avatarId: string;
    password: string;
    name: string;
    roles: string[];
    addresses?: AdminCreateUserAddressDto[];
    email: string;
    gender: string;
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
    birthdate?: string;
    isTempPassWord: boolean;
    resetTokenVersion: number;
}

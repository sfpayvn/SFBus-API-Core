import { Types } from 'mongoose';
export declare class PosCreateUserAddressDto {
    addressType: string;
    address: string;
    isDefault: boolean;
}
export declare class PosCreateUserDto {
    tenantId: Types.ObjectId;
    phoneNumber: string;
    avatarId: string;
    password: string;
    name: string;
    roles: string[];
    addresses?: PosCreateUserAddressDto[];
    email: string;
    gender: string;
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
    birthdate?: string;
    isTempPassWord: boolean;
    resetTokenVersion: number;
}

import { Types } from 'mongoose';
export declare class ClientCreateUserAddressDto {
    addressType: string;
    address: string;
    isDefault: boolean;
}
export declare class ClientCreateUserDto {
    tenantId: Types.ObjectId;
    phoneNumber: string;
    avatarId: string;
    password: string;
    name: string;
    roles: string[];
    addresses?: ClientCreateUserAddressDto[];
    email: string;
    gender: string;
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
    birthdate?: string;
    isTempPassWord: boolean;
    resetTokenVersion: number;
}

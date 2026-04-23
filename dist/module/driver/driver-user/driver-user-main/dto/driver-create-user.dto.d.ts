import { Types } from 'mongoose';
export declare class DriverCreateUserAddressDto {
    addressType: string;
    address: string;
    isDefault: boolean;
}
export declare class DriverCreateUserDto {
    tenantId: Types.ObjectId;
    phoneNumber: string;
    avatarId: string;
    password: string;
    name: string;
    roles: string[];
    addresses?: DriverCreateUserAddressDto[];
    email: string;
    gender: string;
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
    birthdate?: string;
    isTempPassWord: boolean;
    resetTokenVersion: number;
}

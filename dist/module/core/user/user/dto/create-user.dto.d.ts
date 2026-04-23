import { Types } from 'mongoose';
export declare class CreateUserAddressDto {
    addressType: string;
    address: string;
    isDefault: boolean;
}
export declare class CreateUserDto {
    tenantId: Types.ObjectId;
    phoneNumber: string;
    avatarId: string;
    password: string;
    name: string;
    roles: string[];
    addresses?: CreateUserAddressDto[];
    email: string;
    gender: string;
    birthdate?: string;
    isTempPassWord: boolean;
    resetTokenVersion: number;
}

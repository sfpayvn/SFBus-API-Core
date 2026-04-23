import { Types } from 'mongoose';
import { TenantDto } from '@/module/core/tenant/dto/tenant.dto';
export declare class DriverUserAddressDto {
    _id: Types.ObjectId;
    addressType: string;
    address: string;
    isDefault: boolean;
}
export declare class DriverUserDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    tenant?: TenantDto;
    avatar: string;
    avatarId: string;
    password: string;
    name: string;
    addresses?: DriverUserAddressDto[];
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
    updatedAt: Date;
    __v: number;
    tokenVersion?: number;
}
export declare class DriverSearchUsersTypesQuery {
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
export declare class DriverSearchUsersRes {
    pageIdx: number;
    users: DriverUserDto[];
    totalPage: number;
    totalItem: number;
}
export declare class DriverRequestUpdateUserFieldDto {
    userId: Types.ObjectId;
    fieldName: string;
    value: any;
}

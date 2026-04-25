import { Types } from 'mongoose';
import { TenantDto } from '@/module/core/tenant/dto/tenant.dto';
export declare class ClientUserAddressDto {
    _id: Types.ObjectId;
    addressType: string;
    address: string;
    isDefault: boolean;
}
export declare class ClientUserDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    tenant?: TenantDto;
    avatar: string;
    avatarId: string;
    password: string;
    name: string;
    addresses?: ClientUserAddressDto[];
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
export declare class ClientSearchUsersTypesQuery {
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
export declare class ClientSearchUsersRes {
    pageIdx: number;
    users: ClientUserDto[];
    totalPage: number;
    totalItem: number;
}
export declare class ClientRequestUpdateUserFieldDto {
    fieldName: string;
    value: any;
}

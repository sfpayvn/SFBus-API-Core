import { Types } from 'mongoose';
import { TenantDto } from '@/module/core/tenant/dto/tenant.dto';
export declare class UserAddressDto {
    _id: Types.ObjectId;
    addressType: string;
    address: string;
    isDefault: boolean;
}
export declare class UserDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    tenant?: TenantDto;
    avatar: string;
    avatarId: string;
    password: string;
    name: string;
    addresses?: UserAddressDto[];
    gender: string;
    email: string;
    phoneNumber: string;
    birthdate?: Date;
    roles: string[];
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
    isLocked: boolean;
    tokenVersion?: number;
    resetTokenVersion: number;
    isDeleted: boolean;
    createdAt: Date;
    isTempPassWord: boolean;
    updatedAt: Date;
    __v: number;
}
export declare class SearchUserQuerySortFilter {
    key: string;
    value: string[] | string;
}
export declare class SearchUsersTypesQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: SearchUserQuerySortFilter;
    filters: SearchUserQuerySortFilter[];
}
export declare class SearchUsersRes {
    pageIdx: number;
    users: UserDto[];
    totalPage: number;
    totalItem: number;
}

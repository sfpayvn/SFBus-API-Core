import { Types } from 'mongoose';
import { TenantDto } from '@/module/core/tenant/dto/tenant.dto';
export declare class AdminUserAddressDto {
    _id: Types.ObjectId;
    addressType: string;
    address: string;
    isDefault: boolean;
}
export declare class AdminUserDto {
    _id: Types.ObjectId;
    tenantId: Types.ObjectId;
    tenant?: TenantDto;
    avatar: string;
    avatarId: string;
    password: string;
    name: string;
    addresses?: AdminUserAddressDto[];
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
export declare class AdminSearchUserQuerySortFilter {
    key: string;
    value: string[] | string;
}
export declare class AdminSearchUsersQuery {
    pageIdx: number;
    pageSize: number;
    keyword: string;
    sortBy: AdminSearchUserQuerySortFilter;
    filters: AdminSearchUserQuerySortFilter[];
}
export declare class AdminSearchUsersRes {
    pageIdx: number;
    users: AdminUserDto[];
    totalPage: number;
    totalItem: number;
}
export declare class AdminRequestUpdateUserFieldDto {
    userId: Types.ObjectId;
    fieldName: string;
    value: any;
}

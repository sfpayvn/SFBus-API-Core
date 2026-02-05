import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { TenantDto } from '@/module/core/tenant/dto/tenant.dto';

export class AdminUserAddressDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  addressType: string;

  @Expose()
  address: string;

  @Expose()
  isDefault: boolean;
}

export class AdminUserDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  tenant?: TenantDto;

  @Expose()
  avatar: string;

  @Expose()
  avatarId: string;

  @Expose()
  password: string;

  @Expose()
  name: string;

  @Expose()
  addresses?: AdminUserAddressDto[];

  @Expose()
  gender: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  birthdate?: Date;

  @Expose()
  roles: string[];

  @Expose()
  isEmailVerified: boolean;

  @Expose()
  isPhoneNumberVerified: boolean;

  @Expose()
  isLocked: boolean;

  @Exclude()
  resetTokenVersion: number;

  @Exclude()
  isDeleted: boolean;

  @Exclude()
  createdAt: Date;

  @Expose()
  isTempPassWord: boolean;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class AdminSearchUserQuerySortFilter {
  key: string;
  value: string[] | string;
}

export class AdminSearchUsersQuery {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  pageIdx: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  pageSize: number;

  @IsOptional()
  @IsString()
  keyword: string;

  @IsOptional()
  sortBy: AdminSearchUserQuerySortFilter;

  @IsOptional()
  filters: AdminSearchUserQuerySortFilter[];
}

export class AdminSearchUsersRes {
  pageIdx: number = 0;
  users: AdminUserDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

export class AdminRequestUpdateUserFieldDto {
  @IsNotEmpty()
  userId: Types.ObjectId;
  @IsNotEmpty()
  fieldName: string;
  @IsNotEmpty()
  value: any;
}

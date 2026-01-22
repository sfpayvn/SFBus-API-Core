import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { TenantDto } from '@/module/core/tenant/dto/tenant.dto';

export class UserAddressDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  addressType: string;

  @Expose()
  address: string;

  @Expose()
  isDefault: boolean;
}

export class UserDto {
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
  addresses?: UserAddressDto[];

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

export class SearchUserQuerySortFilter {
  key: string;

  value: string[] | string;
}

export class SearchUsersTypesQuery {
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  pageIdx: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  pageSize: number;

  @IsOptional()
  @IsString()
  keyword: string;

  @IsOptional()
  sortBy: SearchUserQuerySortFilter;

  @IsOptional()
  filters: SearchUserQuerySortFilter[];
}

export class SearchUsersRes {
  pageIdx: number = 0;
  users: UserDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

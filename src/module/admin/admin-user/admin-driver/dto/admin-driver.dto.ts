import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { AdminUserDto } from '../../admin-user-main/dto/admin-user.dto';

export class AdminDriverDto extends AdminUserDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  userId: Types.ObjectId;

  @Expose()
  licenseNumber: string;

  @Expose()
  licenseExpirationDate: Date;

  @Expose()
  licenseType: string;

  @Expose()
  licenseImage: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class AdminSearchDriversQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class AdminSearchDriversQuery {
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
  sortBy: AdminSearchDriversQuerySortFilter;

  @IsOptional()
  @IsString()
  filters: AdminSearchDriversQuerySortFilter[];
}

export class AdminSearchDriversRes {
  pageIdx: number = 0;
  userDrivers: AdminDriverDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

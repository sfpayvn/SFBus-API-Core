import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from '../../user/dto/user.dto';

export class DriverDto extends UserDto {
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

export class SearchDriversQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class SearchDriversQuery {
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
  sortBy: SearchDriversQuerySortFilter;

  @IsOptional()
  @IsString()
  filters: SearchDriversQuerySortFilter[];
}

export class SearchDriversRes {
  pageIdx: number = 0;
  userDrivers: DriverDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

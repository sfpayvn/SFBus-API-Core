import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { ClientUserDto } from '../../client-user-main/dto/client-user.dto';

export class ClientDriverDto extends ClientUserDto {
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

export class ClientSearchDriversQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class ClientSearchDriversQuery {
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
  sortBy: ClientSearchDriversQuerySortFilter;

  @IsOptional()
  @IsString()
  filters: ClientSearchDriversQuerySortFilter[];
}

export class ClientSearchDriversRes {
  pageIdx: number = 0;
  userDrivers: ClientDriverDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

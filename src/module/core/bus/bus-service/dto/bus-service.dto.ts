import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Date, Types } from 'mongoose';

export class BusServiceDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  iconId: Types.ObjectId;

  @Expose()
  icon: any;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class SearchBusServicesQuerySortFilter {
  key: string;
  value: string;
}

export class SearchBusServicesQuery {
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
  sortBy: SearchBusServicesQuerySortFilter;

  @IsOptional()
  filters: SearchBusServicesQuerySortFilter[];
}

export class SearchBusServicesRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busServices: BusServiceDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

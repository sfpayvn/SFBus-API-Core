import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AdminSeatDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  index: number;

  @Expose()
  typeId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  status: string;
}

export class AdminBusSeatLayoutTemplateDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  seats: AdminSeatDto[];
}

export class AdminBusLayoutTemplateDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  seatLayouts: AdminBusSeatLayoutTemplateDto[];

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class AdminSearchBusLayoutTemplateQuerySortFilter {
  key: string;
  value: string;
}

export class AdminSearchBusLayoutTemplateQuery {
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
  sortBy: AdminSearchBusLayoutTemplateQuerySortFilter;

  @IsOptional()
  filters: AdminSearchBusLayoutTemplateQuerySortFilter[];
}

export class AdminSearchBusTemplateRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busLayoutTemplates: AdminBusLayoutTemplateDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

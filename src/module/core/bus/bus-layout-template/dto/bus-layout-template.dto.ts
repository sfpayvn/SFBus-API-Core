import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class SeatDto {
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

export class BusSeatLayoutTemplateDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  seats: SeatDto[];
}

export class BusLayoutTemplateDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  seatLayouts: BusSeatLayoutTemplateDto[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class SearchBusLayoutTemplateQuerySortFilter {
  key: string;
  value: string;
}

export class SearchBusLayoutTemplateQuery {
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
  sortBy: SearchBusLayoutTemplateQuerySortFilter;

  @IsOptional()
  filters: SearchBusLayoutTemplateQuerySortFilter[];
}

export class SearchBusTemplateRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busLayoutTemplates: BusLayoutTemplateDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

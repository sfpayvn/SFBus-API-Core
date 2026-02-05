import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ClientSeatDto {
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

export class ClientBusSeatLayoutTemplateDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  seats: ClientSeatDto[];
}

export class ClientBusLayoutTemplateDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  seatLayouts: ClientBusSeatLayoutTemplateDto[];

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class ClientSearchBusLayoutTemplateQuerySortFilter {
  key: string;
  value: string;
}

export class ClientSearchBusLayoutTemplateQuery {
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
  sortBy: ClientSearchBusLayoutTemplateQuerySortFilter;

  @IsOptional()
  filters: ClientSearchBusLayoutTemplateQuerySortFilter[];
}

export class ClientSearchBusTemplateRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busLayoutTemplates: ClientBusLayoutTemplateDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

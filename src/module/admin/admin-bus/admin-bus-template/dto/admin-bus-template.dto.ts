// src/BusTemplate/interfaces/BusTemplate.interface.ts
import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { AdminBusServiceDto } from '../../admin-bus-service/dto/admin-bus-service.dto';
import { AdminBusTypeDto } from '../../admin-bus-type/dto/admin-bus-type.dto';

export class AdminBusTemplateDto {
  @Expose()
  _id: string;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  busServiceIds: Types.ObjectId[];

  @Expose()
  busServices: AdminBusServiceDto[];

  @Expose()
  busTypeId: Types.ObjectId;

  @Expose()
  busType: AdminBusTypeDto;

  @Expose()
  busLayoutTemplateId: Types.ObjectId;

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class AdminSearchBusTemplateQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class AdminSearchBusTemplateQuery {
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
  sortBy: AdminSearchBusTemplateQuerySortFilter;

  @IsOptional()
  filters: AdminSearchBusTemplateQuerySortFilter[];
}

export class AdminSearchBusTemplateRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busTemplates: AdminBusTemplateDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

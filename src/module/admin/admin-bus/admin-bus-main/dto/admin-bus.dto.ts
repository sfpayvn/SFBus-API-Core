// src/bus/interfaces/bus.interface.ts
import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { AdminBusTemplateDto } from '../../admin-bus-template/dto/admin-bus-template.dto';

export class AdminBusDto {
  @Expose()
  _id: string;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  busTemplateId: Types.ObjectId;

  @Expose()
  busTemplate: AdminBusTemplateDto;

  @Expose()
  licensePlate: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class AdminSearchBusQuerySortFilter {
  key: string;
  value: string;
}

export class AdminSearchBusQuery {
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
  sortBy: AdminSearchBusQuerySortFilter;

  @IsOptional()
  @IsString()
  filters: AdminSearchBusQuerySortFilter[];
}

export class AdminSearchBusRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  buses: AdminBusDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

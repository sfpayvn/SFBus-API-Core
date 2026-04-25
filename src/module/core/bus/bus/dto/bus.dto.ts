// src/bus/interfaces/bus.interface.ts
import { Types } from 'mongoose';
import { BusServiceDto } from '../../bus-service/dto/bus-service.dto';
import { BusTypeDto } from '../../bus-type/dto/bus-type.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { BusTemplateDto } from '../../bus-template/dto/bus-template.dto';

export class BusDto {
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
  busTemplate: BusTemplateDto;

  @Expose()
  licensePlate: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class SearchBusQuerySortFilter {
  key: string;
  value: string;
}

export class SearchBusQuery {
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
  sortBy: SearchBusQuerySortFilter;

  @IsOptional()
  @IsString()
  filters: SearchBusQuerySortFilter[];
}

export class SearchBusRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  buses: BusDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

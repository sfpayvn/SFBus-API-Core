// src/BusTemplate/interfaces/BusTemplate.interface.ts
import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { BusTypeDto } from '../../bus-type/dto/bus-type.dto';
import { BusServiceDto } from '../../bus-service/dto/bus-service.dto';

export class BusTemplateDto {
  @Expose()
  _id: string;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  busServiceIds: Types.ObjectId[];

  @Expose()
  busServices: BusServiceDto[];

  @Expose()
  busTypeId: Types.ObjectId;

  @Expose()
  busType: BusTypeDto;

  @Expose()
  busLayoutTemplateId: Types.ObjectId;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class SearchBusTemplateQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class SearchBusTemplateQuery {
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
  sortBy: SearchBusTemplateQuerySortFilter;

  @IsOptional()
  filters: SearchBusTemplateQuerySortFilter[];
}

export class SearchBusTemplateRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busTemplates: BusTemplateDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

// src/BusTemplate/interfaces/BusTemplate.interface.ts
import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { ClientBusServiceDto } from '../../client-bus-service/dto/client-bus-service.dto';
import { ClientBusTypeDto } from '../../client-bus-type/dto/client-bus-type.dto';

export class ClientBusTemplateDto {
  @Expose()
  _id: string;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  busServiceIds: Types.ObjectId[];

  @Expose()
  busServices: ClientBusServiceDto[];

  @Expose()
  busTypeId: Types.ObjectId;

  @Expose()
  busType: ClientBusTypeDto;

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

export class ClientSearchBusTemplateQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class ClientSearchBusTemplateQuery {
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
  sortBy: ClientSearchBusTemplateQuerySortFilter;

  @IsOptional()
  filters: ClientSearchBusTemplateQuerySortFilter[];
}

export class ClientSearchBusTemplateRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busTemplates: ClientBusTemplateDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

// src/bus/interfaces/bus.interface.ts
import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { ClientBusTemplateDto } from '../../client-bus-template/dto/client-bus-template.dto';

export class ClientBusDto {
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
  busTemplate: ClientBusTemplateDto;

  @Expose()
  licensePlate: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class ClientSearchBusQuerySortFilter {
  key: string;
  value: string;
}

export class ClientSearchBusQuery {
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
  sortBy: ClientSearchBusQuerySortFilter;

  @IsOptional()
  @IsString()
  filters: ClientSearchBusQuerySortFilter[];
}

export class ClientSearchBusRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  buses: ClientBusDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

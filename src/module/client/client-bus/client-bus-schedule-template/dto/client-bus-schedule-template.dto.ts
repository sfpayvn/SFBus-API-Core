import { Types } from 'mongoose';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ClientBusRouteDto } from '../../client-bus-route/dto/client-bus-route.dto';
import { ClientBusSeatPrices } from '../../client-bus-schedule/dto/client-bus-schedule.dto';

export class ClientBusScheduleTemplateBreakPointsTimeDto {
  @Expose()
  busStationId: Types.ObjectId;

  @Expose()
  timeOffset: string;
}

export class ClientBusScheduleTemplateRouteDto extends ClientBusRouteDto {
  @Expose()
  breakPoints: ClientBusScheduleTemplateBreakPointsTimeDto[];
}

export class ClientBusScheduleTemplateSeatPrices extends ClientBusSeatPrices {}

export class ClientBusScheduleTemplateDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  busId: Types.ObjectId;

  @Expose()
  busDriverIds: Types.ObjectId[];

  @Expose()
  busTemplateId: Types.ObjectId;

  @Expose()
  busSeatLayoutBlockIds: Types.ObjectId[] = [];

  @Expose()
  busRouteId: Types.ObjectId;

  @Expose()
  busRoute: ClientBusScheduleTemplateRouteDto;

  @Expose()
  busSeatPrices: ClientBusScheduleTemplateSeatPrices[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class ClientSearchBusScheduleTemplateQuerySortFilter {
  key: string;
  value: string;
}

export class ClientSearchBusScheduleTemplateQuery {
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
  sortBy: ClientSearchBusScheduleTemplateQuerySortFilter;

  @IsOptional()
  filters: ClientSearchBusScheduleTemplateQuerySortFilter[];
}

export class ClientSearchBusScheduleTemplateRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busScheduleTemplates: ClientBusScheduleTemplateDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

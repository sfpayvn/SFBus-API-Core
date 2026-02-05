import { Types } from 'mongoose';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { AdminBusSeatPrices } from '../../admin-bus-schedule/dto/admin-bus-schedule.dto';
import { AdminBusRouteDto } from '../../admin-bus-route/dto/admin-admin-bus-route.dto';

export class AdminBusScheduleTemplateBreakPointsTimeDto {
  @Expose()
  busStationId: Types.ObjectId;

  @Expose()
  timeOffset: string;
}

export class AdminBusScheduleTemplateRouteDto extends AdminBusRouteDto {
  @Expose()
  breakPoints: AdminBusScheduleTemplateBreakPointsTimeDto[];
}

export class AdminBusScheduleTemplateSeatPrices extends AdminBusSeatPrices {}

export class AdminBusScheduleTemplateDto {
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
  busRoute: AdminBusScheduleTemplateRouteDto;

  @Expose()
  busSeatPrices: AdminBusScheduleTemplateSeatPrices[];

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class AdminSearchBusScheduleTemplateQuerySortFilter {
  key: string;
  value: string;
}

export class AdminSearchBusScheduleTemplateQuery {
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
  sortBy: AdminSearchBusScheduleTemplateQuerySortFilter;

  @IsOptional()
  filters: AdminSearchBusScheduleTemplateQuerySortFilter[];
}

export class AdminSearchBusScheduleTemplateRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busScheduleTemplates: AdminBusScheduleTemplateDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

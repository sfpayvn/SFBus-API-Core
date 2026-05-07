import { Types } from 'mongoose';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { PosBusRouteDto } from '../../pos-bus-route/dto/pos-bus-route.dto';
import { PosBusSeatPrices } from '../../pos-bus-schedule/dto/pos-bus-schedule.dto';

export class PosBusScheduleTemplateBreakPointsTimeDto {
  @Expose()
  busStationId: Types.ObjectId;

  @Expose()
  timeOffset: string;
}

export class PosBusScheduleTemplateRouteDto extends PosBusRouteDto {
  @Expose()
  breakPoints: PosBusScheduleTemplateBreakPointsTimeDto[];
}

export class PosBusScheduleTemplateSeatPrices extends PosBusSeatPrices {}

export class PosBusScheduleTemplateDto {
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
  busRoute: PosBusScheduleTemplateRouteDto;

  @Expose()
  busSeatPrices: PosBusScheduleTemplateSeatPrices[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosSearchBusScheduleTemplateQuerySortFilter {
  key: string;
  value: string;
}

export class PosSearchBusScheduleTemplateQuery {
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
  @MaxLength(100)
  keyword: string;

  @IsOptional()
  sortBy: PosSearchBusScheduleTemplateQuerySortFilter;

  @IsOptional()
  filters: PosSearchBusScheduleTemplateQuerySortFilter[];
}

export class PosSearchBusScheduleTemplateRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busScheduleTemplates: PosBusScheduleTemplateDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
import { Types } from 'mongoose';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { BusDto } from '../../bus/dto/bus.dto';
import { BusRouteDto } from '../../bus-route/dto/bus-route.dto';
import { BusProvinceDto } from '../../bus-province/dto/bus-province.dto';
import { BusLayoutTemplateDto } from '../../bus-layout-template/dto/bus-layout-template.dto';
import { BusSeatPrices } from '../../bus-schedule/dto/bus-schedule.dto';

export class BusScheduleTemplateBreakPointsTimeDto {
  @Expose()
  busStationId: Types.ObjectId;

  @Expose()
  timeOffset: string;
}

export class BusScheduleTemplateRouteDto extends BusRouteDto {
  @Expose()
  breakPoints: BusScheduleTemplateBreakPointsTimeDto[];
}

export class BusScheduleTemplateSeatPrices extends BusSeatPrices {}

export class BusScheduleTemplateDto {
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
  busRoute: BusScheduleTemplateRouteDto;

  @Expose()
  busSeatPrices: BusScheduleTemplateSeatPrices[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class SearchBusScheduleTemplateQuerySortFilter {
  key: string;
  value: string;
}

export class SearchBusScheduleTemplateQuery {
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
  sortBy: SearchBusScheduleTemplateQuerySortFilter;

  @IsOptional()
  filters: SearchBusScheduleTemplateQuerySortFilter[];
}

export class SearchBusScheduleTemplateRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busScheduleTemplates: BusScheduleTemplateDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

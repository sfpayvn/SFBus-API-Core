import { Types } from 'mongoose';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { BusDto } from '../../bus/dto/bus.dto';
import { BusRouteDto } from '../../bus-route/dto/bus-route.dto';
import { BusProvinceDto } from '../../bus-province/dto/bus-province.dto';
import { BusTemplateDto } from '../../bus-template/dto/bus-template.dto';
import { DriverDto } from '@/module/core/user/driver/dto/driver.dto';

export class BusScheduleBreakPointsTimeDto {
  @Expose()
  busStationId: Types.ObjectId;

  @Expose()
  province: BusProvinceDto;

  @Expose()
  name: string;

  @Expose()
  detailAddress: string;

  @Expose()
  location: string;

  @Expose()
  provinceId: Types.ObjectId;

  @Expose()
  timeSchedule: string;
}

export class BusScheduleBusDto extends BusDto {}

export class BusScheduleRouteDto extends BusRouteDto {
  breakPoints: BusScheduleBreakPointsTimeDto[];
}

export class BusSeatPrices {
  @Expose()
  seatTypeId: Types.ObjectId;

  @Expose()
  seatTypeName: string;

  @Expose()
  price: number;
}

export class BusScheduleDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  busScheduleNumber: string;

  @Expose()
  name: string;

  @Expose()
  busId?: Types.ObjectId;

  @Expose()
  busDriverIds: Types.ObjectId[];

  @Expose()
  busDrivers?: DriverDto[];

  @Expose()
  bus?: BusScheduleBusDto;

  @Expose()
  busTemplateId: Types.ObjectId;

  @Expose()
  busTemplate: BusTemplateDto;

  @Expose()
  busRouteId: Types.ObjectId;

  @Expose()
  busRoute: BusScheduleRouteDto;

  @Expose()
  busLayoutTemplateId: Types.ObjectId;

  @Expose()
  busScheduleTemplateId: Types.ObjectId;

  @Expose()
  busSeatPrices: BusSeatPrices[];

  @Expose()
  remainSeat: number;

  @Expose()
  status: 'un_published' | 'scheduled' | 'overdue' | 'in_progress' | 'completed' | 'cancelled';

  @Expose()
  note?: string;

  @Expose()
  startDate: string;

  @Expose()
  endDate: string;

  @Expose()
  currentStationId: Types.ObjectId;

  @Exclude()
  busSeatLayoutBlockIds: Types.ObjectId[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class SearchBusScheduleQuery {
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  departureDate: Date;

  @Type(() => String)
  @IsNotEmpty()
  departureId: Types.ObjectId;

  @Type(() => String)
  @IsNotEmpty()
  destinationId: Types.ObjectId;
}

export class BusScheduleSortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string | string[];
}

export class SearchBusSchedulePagingQuery {
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
  sortBy: BusScheduleSortFilter;

  @IsOptional()
  filters: BusScheduleSortFilter[];

  @IsOptional()
  startDate: string;

  @IsOptional()
  endDate: string;

  @Type(() => String)
  departureId: Types.ObjectId;

  @Type(() => String)
  destinationId: Types.ObjectId;
}

export class SearchBusSchedulePagingRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busSchedules: BusScheduleDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

export class SearchBusScheduleDriverQuery {
  @IsOptional()
  @IsString()
  keyword: string;

  @IsOptional()
  sortBy: BusScheduleSortFilter;

  @IsOptional()
  filters: BusScheduleSortFilter[];
}

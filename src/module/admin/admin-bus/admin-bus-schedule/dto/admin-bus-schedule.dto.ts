import { Types } from 'mongoose';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { AdminBusProvinceDto } from '../../admin-bus-province/dto/admin-bus-province.dto';
import { AdminBusTemplateDto } from '../../admin-bus-template/dto/admin-bus-template.dto';
import { AdminBusDto } from '../../admin-bus-main/dto/admin-bus.dto';
import { AdminBusRouteDto } from '../../admin-bus-route/dto/admin-admin-bus-route.dto';
import { AdminDriverDto } from '@/module/admin/admin-user/admin-driver/dto/admin-driver.dto';

export class AdminBusScheduleBreakPointsTimeDto {
  @Expose()
  busStationId: Types.ObjectId;

  @Expose()
  province: AdminBusProvinceDto;

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

export class AdminBusScheduleBusDto extends AdminBusDto {}

export class AdminBusScheduleRouteDto extends AdminBusRouteDto {
  @Expose()
  breakPoints: AdminBusScheduleBreakPointsTimeDto[];
}

export class AdminBusSeatPrices {
  @Expose()
  seatTypeId: Types.ObjectId;

  @Expose()
  seatTypeName: string;

  @Expose()
  price: number;
}

export class AdminBusScheduleDto {
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
  currentStationId: Types.ObjectId;

  @Expose()
  busDriverIds: Types.ObjectId[];

  @Expose()
  busDrivers?: AdminDriverDto[];

  @Expose()
  bus?: AdminBusScheduleBusDto;

  @Expose()
  busTemplateId: Types.ObjectId;

  @Expose()
  busTemplate: AdminBusTemplateDto;

  @Expose()
  busRouteId: Types.ObjectId;

  @Expose()
  busRoute: AdminBusScheduleRouteDto;

  @Expose()
  busLayoutTemplateId: Types.ObjectId;

  @Expose()
  busScheduleTemplateId: Types.ObjectId;

  @Expose()
  busSeatPrices: AdminBusSeatPrices[];

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

  @Exclude()
  busSeatLayoutBlockIds: Types.ObjectId[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class AdminSearchBusScheduleQuery {
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

export class AdminSearchBusSchedulePagingQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class AdminSearchBusSchedulePagingQuery {
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
  sortBy: AdminSearchBusSchedulePagingQuerySortFilter;

  @IsOptional()
  filters: AdminSearchBusSchedulePagingQuerySortFilter[];

  @IsOptional()
  startDate: string;

  @IsOptional()
  endDate: string;

  @Type(() => String)
  departureId: Types.ObjectId;

  @Type(() => String)
  destinationId: Types.ObjectId;
}

export class AdminSearchBusSchedulePagingRes {
  @Expose()
  pageIdx: number = 0;
  @Expose()
  busSchedules: AdminBusScheduleDto[];
  @Expose()
  totalPage: number = 0;
  @Expose()
  totalItem: number = 0;
}

export class AdminSearchBusScheduleDriverQuery {
  @Type(() => Types.ObjectId)
  @IsNotEmpty()
  driverId: Types.ObjectId;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;
}

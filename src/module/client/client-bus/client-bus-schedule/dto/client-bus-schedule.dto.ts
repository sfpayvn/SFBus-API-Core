import { Types } from 'mongoose';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ClientBusProvinceDto } from '../../client-bus-province/dto/client-bus-province.dto';
import { ClientBusTemplateDto } from '../../client-bus-template/dto/client-bus-template.dto';
import { ClientBusDto } from '../../client-bus-main/dto/client-bus.dto';
import { ClientBusRouteDto } from '../../client-bus-route/dto/client-bus-route.dto';
import { ClientDriverDto } from '@/module/client/client-user/client-driver/dto/client-driver.dto';

export class ClientBusScheduleBreakPointsTimeDto {
  @Expose()
  busStationId: Types.ObjectId;

  @Expose()
  province: ClientBusProvinceDto;

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

export class ClientBusScheduleBusDto extends ClientBusDto {}

export class ClientBusScheduleRouteDto extends ClientBusRouteDto {
  @Expose()
  breakPoints: ClientBusScheduleBreakPointsTimeDto[];
}

export class ClientBusSeatPrices {
  @Expose()
  seatTypeId: Types.ObjectId;

  @Expose()
  seatTypeName: string;

  @Expose()
  price: number;
}

export class ClientBusScheduleDto {
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
  busDrivers?: ClientDriverDto[];

  @Expose()
  bus?: ClientBusScheduleBusDto;

  @Expose()
  busTemplateId: Types.ObjectId;

  @Expose()
  busTemplate: ClientBusTemplateDto;

  @Expose()
  busRouteId: Types.ObjectId;

  @Expose()
  busRoute: ClientBusScheduleRouteDto;

  @Expose()
  busLayoutTemplateId: Types.ObjectId;

  @Expose()
  busScheduleTemplateId: Types.ObjectId;

  @Expose()
  busSeatPrices: ClientBusSeatPrices[];

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

export class ClientSearchBusScheduleQuery {
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

export class ClientSearchBusSchedulePagingQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class ClientSearchBusSchedulePagingQuery {
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
  sortBy: ClientSearchBusSchedulePagingQuerySortFilter;

  @IsOptional()
  filters: ClientSearchBusSchedulePagingQuerySortFilter[];

  @IsOptional()
  startDate: string;

  @IsOptional()
  endDate: string;

  @Type(() => String)
  departureId: Types.ObjectId;

  @Type(() => String)
  destinationId: Types.ObjectId;
}

export class ClientSearchBusSchedulePagingRes {
  @Expose()
  pageIdx: number = 0;
  @Expose()
  busSchedules: ClientBusScheduleDto[];
  @Expose()
  totalPage: number = 0;
  @Expose()
  totalItem: number = 0;
}

export class ClientSearchBusScheduleDriverQuery {
  @Type(() => Types.ObjectId)
  @IsNotEmpty()
  driverId: Types.ObjectId;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;
}

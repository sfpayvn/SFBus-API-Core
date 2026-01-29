import { IsNotEmpty, IsOptional, IsEnum, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { Expose, Type } from 'class-transformer';
import { CreateBusRouteDto } from '@/module/core/bus/bus-route/dto/create-bus-route.dto';
import { CreateBusProvinceDto } from '../../bus-province/dto/create-bus-province.dto';
import { CreateBusRouteBreakPointsDto } from '../../bus-route/dto/create-bus-route.dto';
import { CreateBusScheduleTemplateBusSeatPrices } from '../../bus-schedule-template/dto/create-bus-schedule-template.dto';
import { CreateBusTemplateDto } from '../../bus-template/dto/create-bus-template.dto';
import { CreateBusServiceDto } from '../../bus-service/dto/create-bus-service.dto';
import { CreateBusTypeDto } from '../../bus-type/dto/create-bus-type.dto';
export class CreateBusScheduleBusDto {
  @Expose()
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @Expose()
  @IsOptional()
  @Type(() => String)
  licensePlate: string;

  @Expose()
  @IsOptional()
  @Type(() => String)
  description?: string;

  @Expose()
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busTemplateId: Types.ObjectId;
}

export class CreateBusScheduleBusProvinceDto extends CreateBusProvinceDto {
  @IsNotEmpty()
  @Type(() => String)
  _id: string;
}

export class CreateBusScheduleBusServiceDto extends CreateBusServiceDto {
  @IsNotEmpty()
  @Type(() => String)
  _id: string;
}

export class CreateBusScheduleBusTypeDto extends CreateBusTypeDto {
  @IsNotEmpty()
  @Type(() => String)
  _id: string;
}

export class CreateBusScheduleBusTemplateDto extends CreateBusTemplateDto {
  @IsNotEmpty()
  @Type(() => String)
  _id: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateBusScheduleBusServiceDto)
  busServices: CreateBusScheduleBusServiceDto[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateBusScheduleBusTypeDto)
  busType: CreateBusScheduleBusTypeDto;
}

export class CreateBusScheduleBreakPointsTimeDto extends CreateBusRouteBreakPointsDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busStationId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Boolean)
  isOffice: boolean;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  provinceId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => CreateBusScheduleBusProvinceDto)
  province: CreateBusScheduleBusProvinceDto;

  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsOptional()
  @Type(() => String)
  detailAddress: string;

  @IsOptional()
  @Type(() => String)
  location: string;

  @IsNotEmpty()
  @Type(() => String)
  timeSchedule?: string;

  @IsOptional()
  @Type(() => String)
  notes?: string;
}

export class CreateBusRouteScheduleDto extends CreateBusRouteDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateBusScheduleBreakPointsTimeDto)
  breakPoints: CreateBusScheduleBreakPointsTimeDto[];
}

export class CreateBusScheduleDto {
  tenantId: Types.ObjectId;
  busScheduleNumber: string;
  currentStationId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsOptional()
  @Type(() => Types.ObjectId)
  busId?: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  busDriverIds: Types.ObjectId[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateBusScheduleBusDto)
  bus?: CreateBusScheduleBusDto;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busTemplateId: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateBusScheduleBusTemplateDto)
  busTemplate: CreateBusScheduleBusTemplateDto;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busRouteId: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateBusRouteScheduleDto)
  busRoute: CreateBusRouteScheduleDto;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busLayoutTemplateId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busScheduleTemplateId: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateBusScheduleTemplateBusSeatPrices)
  busSeatPrices: CreateBusScheduleTemplateBusSeatPrices[];

  @IsOptional()
  @IsEnum(['un_published', 'scheduled', 'overdue', 'in_progress', 'completed', 'cancelled'])
  status?: 'un_published' | 'scheduled' | 'overdue' | 'in_progress' | 'completed' | 'cancelled';

  @IsOptional()
  @Type(() => String)
  note?: string;

  @IsNotEmpty()
  @Type(() => String)
  startDate: string;

  @IsNotEmpty()
  @Type(() => String)
  endDate: string;

  @IsOptional()
  @Type(() => Types.ObjectId)
  busSeatLayoutBlockIds: Types.ObjectId[];
}

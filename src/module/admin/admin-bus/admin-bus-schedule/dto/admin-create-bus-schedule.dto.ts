import { IsNotEmpty, IsOptional, IsEnum, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { CreateBusRouteDto } from '@/module/core/bus/bus-route/dto/create-bus-route.dto';
import { BusTemplateDto } from '@/module/core/bus/bus-template/dto/bus-template.dto';
import { AdminCreateBusProvinceDto } from '../../admin-bus-province/dto/admin-create-bus-province.dto';
import { AdminCreateBusRouteBreakPointsDto } from '../../admin-bus-route/dto/admin-create-bus-route.dto';
import { AdminCreateBusScheduleTemplateBusSeatPrices } from '../../admin-bus-schedule-template/dto/admin-create-bus-schedule-template.dto';
import { AdminCreateBusTemplateDto } from '../../admin-bus-template/dto/admin-create-bus-template.dto';
import { AdminCreateBusServiceDto } from '../../admin-bus-service/dto/admin-create-bus-service.dto';
import { AdminCreateBusTypeDto } from '../../admin-bus-type/dto/admin-create-bus-type.dto';
export class AdminCreateBusScheduleBusDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsOptional()
  @Type(() => String)
  licensePlate: string;

  @IsOptional()
  @Type(() => String)
  description?: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busTemplateId: Types.ObjectId;
}

export class AdminCreateBusScheduleBusProvinceDto extends AdminCreateBusProvinceDto {
  @IsNotEmpty()
  @Type(() => String)
  _id: string;
}

export class AdminCreateBusScheduleBusServiceDto extends AdminCreateBusServiceDto {
  @IsNotEmpty()
  @Type(() => String)
  _id: string;
}

export class AdminCreateBusScheduleBusTypeDto extends AdminCreateBusTypeDto {
  @IsNotEmpty()
  @Type(() => String)
  _id: string;
}

export class AdminCreateBusScheduleBusTemplateDto extends AdminCreateBusTemplateDto {
  @IsNotEmpty()
  @Type(() => String)
  _id: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AdminCreateBusScheduleBusServiceDto)
  busServices: AdminCreateBusScheduleBusServiceDto[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AdminCreateBusScheduleBusTypeDto)
  busType: AdminCreateBusScheduleBusTypeDto;
}

export class AdminCreateBusScheduleBreakPointsTimeDto extends AdminCreateBusRouteBreakPointsDto {
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
  @Type(() => AdminCreateBusScheduleBusProvinceDto)
  province: AdminCreateBusScheduleBusProvinceDto;

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

export class AdminCreateBusRouteScheduleDto extends CreateBusRouteDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AdminCreateBusScheduleBreakPointsTimeDto)
  breakPoints: AdminCreateBusScheduleBreakPointsTimeDto[];
}

export class AdminCreateBusScheduleDto {
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
  @Type(() => AdminCreateBusScheduleBusDto)
  bus?: AdminCreateBusScheduleBusDto;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busTemplateId: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AdminCreateBusScheduleBusTemplateDto)
  busTemplate: AdminCreateBusScheduleBusTemplateDto;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busRouteId: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AdminCreateBusRouteScheduleDto)
  busRoute: AdminCreateBusRouteScheduleDto;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busLayoutTemplateId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busScheduleTemplateId: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AdminCreateBusScheduleTemplateBusSeatPrices)
  busSeatPrices: AdminCreateBusScheduleTemplateBusSeatPrices[];

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

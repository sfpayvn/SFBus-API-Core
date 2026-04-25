import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import {
  AdminCreateBusRouteBreakPointsDto,
  AdminCreateBusRouteDto,
} from '../../admin-bus-route/dto/admin-create-bus-route.dto';

export class AdminCreateBusScheduleTemplateBusSeatPrices {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  seatTypeId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  seatTypeName: string;

  @IsOptional()
  @Type(() => Number)
  price: number;
}

export class AdminCreateBusScheduleTemplateBreakPointsTimeDto extends AdminCreateBusRouteBreakPointsDto {
  @IsNotEmpty()
  @Type(() => String)
  timeOffset: string;
}

export class AdminCreateBusRouteScheduleTemplateDto extends AdminCreateBusRouteDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AdminCreateBusScheduleTemplateBreakPointsTimeDto)
  breakPoints: AdminCreateBusScheduleTemplateBreakPointsTimeDto[];
}

export class AdminCreateBusScheduleTemplateDto {
  tenantId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsOptional()
  @Type(() => Types.ObjectId)
  busId: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  busDriverIds: Types.ObjectId[];

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busTemplateId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busSeatLayoutBlockIds: Types.ObjectId[] = [];

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busRouteId: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AdminCreateBusRouteScheduleTemplateDto)
  busRoute: AdminCreateBusRouteScheduleTemplateDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AdminCreateBusScheduleTemplateBusSeatPrices)
  busSeatPrices: AdminCreateBusScheduleTemplateBusSeatPrices[];
}

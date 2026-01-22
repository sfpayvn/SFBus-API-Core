import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { CreateBusRouteBreakPointsDto, CreateBusRouteDto } from '../../bus-route/dto/create-bus-route.dto';

export class CreateBusScheduleTemplateBusSeatPrices {
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

export class CreateBusScheduleTemplateBreakPointsTimeDto extends CreateBusRouteBreakPointsDto {
  @IsNotEmpty()
  @Type(() => String)
  timeOffset: string;
}

export class CreateBusRouteScheduleTemplateDto extends CreateBusRouteDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateBusScheduleTemplateBreakPointsTimeDto)
  breakPoints: CreateBusScheduleTemplateBreakPointsTimeDto[];
}

export class CreateBusScheduleTemplateDto {
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
  @Type(() => CreateBusRouteScheduleTemplateDto)
  busRoute: CreateBusRouteScheduleTemplateDto;

  @IsNotEmpty()
  @Type(() => CreateBusScheduleTemplateBusSeatPrices)
  busSeatPrices: CreateBusScheduleTemplateBusSeatPrices[];
}

import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';

export class AdminCreateBusRouteDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AdminCreateBusRouteBreakPointsDto)
  breakPoints: AdminCreateBusRouteBreakPointsDto[];

  @IsOptional()
  @Type(() => Number)
  distance: number;

  @IsOptional()
  @Type(() => String)
  distanceTime: string;

  @IsOptional()
  @Type(() => String)
  notes?: string;
}

export class AdminCreateBusRouteBreakPointsDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busStationId: Types.ObjectId;
}

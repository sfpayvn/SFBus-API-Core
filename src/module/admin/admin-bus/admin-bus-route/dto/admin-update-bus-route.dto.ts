import { PartialType } from '@nestjs/mapped-types';
import { AdminCreateBusRouteDto } from './admin-create-bus-route.dto';
import { Types } from 'mongoose';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AdminUpdateBusRouteDto extends PartialType(AdminCreateBusRouteDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateBusRouteDto } from './create-bus-route.dto';
import { Types } from 'mongoose';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBusRouteDto extends PartialType(CreateBusRouteDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { AdminCreateBusStationDto } from './admin-create-bus-station.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class AdminUpdateBusStationDto extends PartialType(AdminCreateBusStationDto) {
  @IsNotEmpty()
  @IsMongoId()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

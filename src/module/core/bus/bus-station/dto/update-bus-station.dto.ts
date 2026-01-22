import { PartialType } from '@nestjs/mapped-types';
import { CreateBusStationDto } from './create-bus-station.dto';
import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBusStationDto extends PartialType(CreateBusStationDto) {
  @IsNotEmpty()
  @IsMongoId()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

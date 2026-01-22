import { PartialType } from '@nestjs/mapped-types';
import { CreateBusServiceDto } from './create-bus-service.dto';
import { Types } from 'mongoose';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class UpdateBusServiceDto extends PartialType(CreateBusServiceDto) {
  @IsNotEmpty()
  @IsMongoId()
  _id: Types.ObjectId;
}

import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { CreateBusTypeDto } from './create-bus-type.dto';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class UpdateBusTypeDto extends PartialType(CreateBusTypeDto) {
  @IsNotEmpty()
  @IsMongoId()
  _id: Types.ObjectId;
}

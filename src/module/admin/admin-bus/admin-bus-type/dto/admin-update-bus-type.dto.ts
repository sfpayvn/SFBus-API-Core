import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { AdminCreateBusTypeDto } from './admin-create-bus-type.dto';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class AdminUpdateBusTypeDto extends PartialType(AdminCreateBusTypeDto) {
  @IsNotEmpty()
  @IsMongoId()
  _id: Types.ObjectId;
}

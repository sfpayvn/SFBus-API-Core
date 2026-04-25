import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { AdminCreateBusDto } from './admin-create-bus.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AdminUpdateBusDto extends PartialType(AdminCreateBusDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

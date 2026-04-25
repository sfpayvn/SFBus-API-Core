import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { AdminCreateSeatTypeDto } from './admin-create-seat-type.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AdminUpdateSeatTypeDto extends PartialType(AdminCreateSeatTypeDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

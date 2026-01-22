import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { CreateSeatTypeDto } from './create-seat-type.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSeatTypeDto extends PartialType(CreateSeatTypeDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

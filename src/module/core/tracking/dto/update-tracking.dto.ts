import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackingDto } from './create-tracking.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateTrackingDto extends PartialType(CreateTrackingDto) {
  @IsNotEmpty()
  @Type(() => String)
  _id: Types.ObjectId;

  @Type(() => String)
  updatedBy: Types.ObjectId;
}

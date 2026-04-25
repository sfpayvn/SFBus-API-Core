import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { CreateSubscriptionDto } from './create-subscription.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

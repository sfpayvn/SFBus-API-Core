import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { AdminCreateSubscriptionDto } from './admin-create-subscription.dto';

export class UpdateAdminSubscriptionDto extends PartialType(AdminCreateSubscriptionDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

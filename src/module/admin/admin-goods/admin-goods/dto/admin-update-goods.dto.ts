import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { AdminCreateGoodsDto } from './admin-create-goods.dto';
import { Types } from 'mongoose';

export class AdminUpdateGoodsDto extends PartialType(AdminCreateGoodsDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  status: string;
}

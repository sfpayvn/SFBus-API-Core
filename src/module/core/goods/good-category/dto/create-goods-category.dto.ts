import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class CreateGoodsCategoryDto {
  tenantId: Types.ObjectId;
  status: string;

  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  iconId: Types.ObjectId;
}

import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AdminCreateSeatTypeDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  iconId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Boolean)
  isEnv: boolean;
}

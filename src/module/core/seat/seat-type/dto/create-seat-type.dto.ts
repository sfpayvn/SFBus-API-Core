import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSeatTypeDto {
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

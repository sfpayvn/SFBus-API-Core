import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateBusServiceDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  iconId: Types.ObjectId;
}

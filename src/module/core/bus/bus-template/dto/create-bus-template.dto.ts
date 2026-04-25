import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBusTemplateDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busLayoutTemplateId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busServiceIds: Types.ObjectId[];

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busTypeId: Types.ObjectId;
}

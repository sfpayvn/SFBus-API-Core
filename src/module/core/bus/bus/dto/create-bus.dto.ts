import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBusDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @Type(() => String)
  licensePlate: string;

  @IsOptional()
  @Type(() => String)
  description?: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busTemplateId: Types.ObjectId;
}

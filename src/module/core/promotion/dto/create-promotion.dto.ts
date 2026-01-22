import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePromotionDto {
  tenantId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  imageId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @Type(() => String)
  code: string;

  @IsOptional()
  @Type(() => String)
  description?: string;

  @IsNotEmpty()
  @Type(() => String)
  discountType: 'percentage' | 'fixed';

  @IsNotEmpty()
  @Type(() => Number)
  discountValue: number;

  @IsNotEmpty()
  @Type(() => Date)
  expireDate: Date;

  @IsNotEmpty()
  @Type(() => String)
  status: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { AdminCreatePromotionDto } from './admin-create-promotion.dto';
import { Type } from 'class-transformer';

export class AdminUpdatePromotionDto extends PartialType(AdminCreatePromotionDto) {
  @IsNotEmpty()
  @Type(() => String)
  _id: string;
}

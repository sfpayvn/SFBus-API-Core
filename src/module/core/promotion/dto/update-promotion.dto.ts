import { PartialType } from '@nestjs/mapped-types';
import { CreatePromotionDto } from './create-promotion.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePromotionDto extends PartialType(CreatePromotionDto) {
  @IsNotEmpty()
  @Type(() => String)
  _id: string;
}

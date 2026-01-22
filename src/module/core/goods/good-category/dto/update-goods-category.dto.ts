import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateGoodsCategoryDto } from './create-goods-category.dto';

export class UpdateGoodsCategoryDto extends PartialType(CreateGoodsCategoryDto) {
  @IsNotEmpty()
  @Type(() => String)
  _id: string;

  @IsNotEmpty()
  @Type(() => String)
  status: string;
}

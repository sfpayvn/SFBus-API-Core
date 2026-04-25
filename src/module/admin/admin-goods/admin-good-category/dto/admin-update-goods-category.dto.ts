import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { AdminCreateGoodsCategoryDto } from './admin-create-goods-category.dto';
import { Type } from 'class-transformer';

export class AdminUpdateGoodsCategoryDto extends PartialType(AdminCreateGoodsCategoryDto) {
  @IsNotEmpty()
  @Type(() => String)
  _id: string;

  @IsNotEmpty()
  @Type(() => String)
  status: string;
}

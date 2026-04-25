import { PartialType } from '@nestjs/mapped-types';
import { CreateBusProvinceDto } from './create-bus-province.dto';
import { Types } from 'mongoose';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class UpdateBusProvinceDto extends PartialType(CreateBusProvinceDto) {
  @IsNotEmpty()
  @IsMongoId()
  _id: Types.ObjectId;
}

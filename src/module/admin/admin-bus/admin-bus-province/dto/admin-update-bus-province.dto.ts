import { PartialType } from '@nestjs/mapped-types';
import { AdminCreateBusProvinceDto } from './admin-create-bus-province.dto';
import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class AdminUpdateBusProvinceDto extends PartialType(AdminCreateBusProvinceDto) {
  @IsNotEmpty()
  @IsMongoId()
  _id: Types.ObjectId;
}

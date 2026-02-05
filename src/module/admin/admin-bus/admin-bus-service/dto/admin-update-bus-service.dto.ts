import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { AdminCreateBusServiceDto } from './admin-create-bus-service.dto';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class AdminUpdateBusServiceDto extends PartialType(AdminCreateBusServiceDto) {
  @IsNotEmpty()
  @IsMongoId()
  _id: Types.ObjectId;
}

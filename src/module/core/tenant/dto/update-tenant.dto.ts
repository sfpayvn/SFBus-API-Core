import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { CreateTenantDto } from './create-tenant.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTenantDto extends PartialType(CreateTenantDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

import { OmitType } from '@nestjs/mapped-types';
import { AdminBusTypeDto } from './admin-bus-type.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AdminCreateBusTypeDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;
}

import { OmitType } from '@nestjs/mapped-types';
import { DriverDto } from './driver.dto';
import { Expose, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDriverDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  userId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  licenseNumber: string;

  @IsNotEmpty()
  @Type(() => Date)
  licenseExpirationDate: Date;

  @IsNotEmpty()
  @Type(() => String)
  licenseType: string;

  @IsOptional()
  @Type(() => String)
  licenseImage: string;
}

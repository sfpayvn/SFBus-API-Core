import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AdminCreateDriverDto {
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

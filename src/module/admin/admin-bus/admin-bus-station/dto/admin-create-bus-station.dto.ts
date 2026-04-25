import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class AdminCreateBusStationDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsOptional()
  @Type(() => String)
  detailAddress: string;

  @IsOptional()
  @Type(() => String)
  location: string;

  @IsNotEmpty()
  @IsMongoId()
  @Type(() => Types.ObjectId)
  provinceId: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  @Type(() => Types.ObjectId)
  imageId?: Types.ObjectId;

  @IsOptional()
  @Type(() => Boolean)
  isOffice?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean;
}

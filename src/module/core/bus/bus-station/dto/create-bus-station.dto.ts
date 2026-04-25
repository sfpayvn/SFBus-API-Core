import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBusStationDto {
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
  @Type(() => Types.ObjectId)
  provinceId: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  imageId?: Types.ObjectId;

  @IsOptional()
  @Type(() => Boolean)
  isOffice?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean;
}

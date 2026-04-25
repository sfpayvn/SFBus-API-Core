import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsDateString } from 'class-validator';
import { Types } from 'mongoose';

export class AdminCreateContentLayoutDto {
  tenantId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  imageId: Types.ObjectId;

  @IsNotEmpty({ each: true })
  zones: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  projectData: string;

  @IsNotEmpty()
  @IsString()
  platform: string;

  @IsNotEmpty()
  @IsString()
  appSource: string;

  @IsOptional()
  @IsBoolean()
  isPublish: boolean;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}

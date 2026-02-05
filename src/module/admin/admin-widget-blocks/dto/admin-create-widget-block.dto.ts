import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AdminCreateWidgetBlockDto {
  tenantId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  imageId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  html: string;

  @IsOptional()
  @IsString()
  css?: string;

  @IsNotEmpty()
  projectData?: string;
}

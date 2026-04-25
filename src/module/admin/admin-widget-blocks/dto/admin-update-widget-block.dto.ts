import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AdminUpdateWidgetBlockDto {
  @IsString()
  _id: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  imageId?: Types.ObjectId;

  @IsOptional()
  @IsString()
  html?: string;

  @IsOptional()
  @IsString()
  css?: string;

  @IsNotEmpty()
  projectData?: string;

  @IsOptional()
  isActive?: boolean;
}

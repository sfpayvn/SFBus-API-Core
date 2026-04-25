import { IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateContentLayoutDto {
  @IsNotEmpty()
  _id: Types.ObjectId;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  imageId: Types.ObjectId;

  @IsNotEmpty()
  zones: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  projectData: string;

  @IsNotEmpty()
  appSource: string;

  @IsNotEmpty()
  platform: string;

  @IsNotEmpty()
  isPublish: boolean;

  @IsNotEmpty()
  startDate: Date;

  @IsOptional()
  endDate?: Date;
}

import { IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateContentLayoutDto {
  tenantId: Types.ObjectId;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  imageId: Types.ObjectId;

  @IsNotEmpty({ each: true })
  zones: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  projectData: string;

  @IsNotEmpty()
  platform: string;

  @IsNotEmpty()
  appSource: string;

  @IsNotEmpty()
  isPublish: boolean;

  @IsNotEmpty()
  startDate: Date;

  @IsOptional()
  endDate?: Date;
}

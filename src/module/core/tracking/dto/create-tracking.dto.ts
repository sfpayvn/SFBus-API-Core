import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { TRACKING_TYPES, TrackingType } from '../constants/tracking-types';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

export class CreateTrackingDto {
  @IsNotEmpty()
  @IsEnum(TRACKING_TYPES)
  type: TrackingType;

  @IsNotEmpty()
  @IsEnum([
    ROLE_CONSTANTS.CLIENT,
    ROLE_CONSTANTS.DRIVER,
    ROLE_CONSTANTS.TENANT_OPERATOR,
    ROLE_CONSTANTS.TENANT,
    ROLE_CONSTANTS.ADMIN,
    ROLE_CONSTANTS.POS,
  ])
  platform: string;

  @IsOptional()
  metadata: Record<string, any>;

  @IsOptional()
  @Type(() => String)
  createdBy: Types.ObjectId;
}

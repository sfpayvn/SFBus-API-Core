import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTenantSettingDto {
  @IsOptional()
  @Type(() => String)
  appearance: string;

  @IsOptional()
  @Type(() => String)
  timezone: string;
}

export class CreateTenantDto {
  @IsNotEmpty()
  @Type(() => String)
  code: string;

  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @Type(() => String)
  phoneNumber: string;

  @IsOptional()
  @Type(() => String)
  email?: string;

  @IsOptional()
  @Type(() => String)
  address?: string;

  @IsOptional()
  @Type(() => Types.ObjectId)
  logoId?: Types.ObjectId;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateTenantSettingDto)
  setting?: CreateTenantSettingDto;

  @IsNotEmpty()
  @Type(() => String)
  status: string;
}

import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AdminCreateSettingDto {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  value: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  description?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  groupName?: string;
}

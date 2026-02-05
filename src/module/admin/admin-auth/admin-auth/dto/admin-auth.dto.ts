import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AdminSignUpDto {
  @IsNotEmpty()
  @Type(() => String)
  tenantName: string;

  @IsNotEmpty()
  @Type(() => String)
  tenantCode: string;

  @IsNotEmpty()
  @Type(() => String)
  phoneNumber: string;

  @IsNotEmpty()
  @Type(() => String)
  password: string;
}

export class AdminForgotPasswordDto {
  @IsNotEmpty()
  @Type(() => String)
  phoneNumber: string;

  @IsNotEmpty()
  @Type(() => String)
  tenantCode: string;

  @IsOptional()
  @Type(() => String)
  redirectBaseUrl?: string;
}
export class AdminResetPasswordDto {
  @IsNotEmpty()
  @Type(() => String)
  token: string;

  @IsNotEmpty()
  @Type(() => String)
  newPassword: string;
}

import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ClientForgotPasswordDto {
  @IsNotEmpty()
  @Type(() => String)
  phoneNumber: string;

  @IsOptional()
  @Type(() => String)
  redirectBaseUrl?: string;
}
export class ClientResetPasswordDto {
  @IsNotEmpty()
  @Type(() => String)
  token: string;

  @IsNotEmpty()
  @Type(() => String)
  newPassword: string;
}

// request-otp.dto.ts
import { IsIn, IsNotEmpty, IsString, Length } from 'class-validator';

export class AdminRequestAuthRescueDto {
  @IsString()
  @IsNotEmpty()
  identifier: string; // email hoặc phone

  @IsIn(['2fa'])
  purpose: '2fa';
}

export class AdminVerifyAuthRescueDto {
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsIn(['2fa'])
  purpose: '2fa';

  @IsString()
  token: string;
}

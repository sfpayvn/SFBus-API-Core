import { IsNotEmpty, IsString } from 'class-validator';

export class AdminLoginUserDto {
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly tenantCode: string;
}

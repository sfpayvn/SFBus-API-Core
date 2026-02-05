import { AdminLoginUserDto } from './admin-login-user.dto';
import { OmitType } from '@nestjs/mapped-types';

export class AdminSignInUserDto extends OmitType(AdminLoginUserDto, ['tenantCode'] as const) {}

import { ClientLoginUserDto } from './client-login-user.dto';
import { OmitType } from '@nestjs/mapped-types';

export class ClientSignInUserDto extends OmitType(ClientLoginUserDto, ['tenantCode'] as const) {}

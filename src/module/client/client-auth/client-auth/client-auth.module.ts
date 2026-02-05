// auth.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ClientAuthService } from './client-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './client-auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from '@/jwt/local.strategy';
import { JwtStrategy } from '@/jwt/jwt.strategy';
import { ClientUserModule } from '../../client-user/client-user-main/client-user.module';
import { ClientTenantModule } from '../../client-tenant/client-tenant.module';
import { UserModule } from '../../../core/user/user/user.module';
import { AuthModule } from '@/module/core/auth/auth/auth.module';
import { ClientAuthRescueModule } from '../client-auth-rescue/client-auth-rescue.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => ClientUserModule),
    forwardRef(() => ClientTenantModule),
    forwardRef(() => PassportModule),
    forwardRef(() => ClientAuthRescueModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1y' },
      }),
    }),
  ],
  providers: [ClientAuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class ClientAuthModule {}

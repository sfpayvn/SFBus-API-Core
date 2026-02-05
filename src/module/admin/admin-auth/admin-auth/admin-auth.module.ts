// auth.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminAuthService } from './admin-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './admin-auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from '@/jwt/local.strategy';
import { JwtStrategy } from '@/jwt/jwt.strategy';
import { AdminUserMainModule } from '../../admin-user/admin-user-main/admin-user-main.module';
import { AdminTenantModule } from '../../admin-tenant/admin-tenant.module';
import { UserModule } from '../../../core/user/user/user.module';
import { AuthModule } from '@/module/core/auth/auth/auth.module';
import { AutoJobTrackingModule } from '@/module/core/auto-job-tracking';
import { AdminBusScheduleAutogeneratorModule } from '../../admin-bus/admin-bus-schedule-autogenerator/admin-bus-schedule-autogenerator.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => AutoJobTrackingModule),
    forwardRef(() => AdminUserMainModule),
    forwardRef(() => AdminTenantModule),
    forwardRef(() => PassportModule),
    forwardRef(() => AdminBusScheduleAutogeneratorModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1y' },
      }),
    }),
  ],
  providers: [AdminAuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AdminAuthModule {}

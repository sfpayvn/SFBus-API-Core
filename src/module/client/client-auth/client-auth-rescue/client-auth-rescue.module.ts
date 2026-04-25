// otp.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientAuthRescueController } from './client-auth-rescue.controller';
import { ClientAuthRescueService } from './client-auth-rescue.service';
import { AuthRescueModule } from '@/module/core/auth/auth-rescue/auth-rescue.module';
import { ClientUserModule } from '../../client-user/client-user-main/client-user.module';
import { ClientTenantModule } from '../../client-tenant/client-tenant.module';

@Module({
  imports: [
    forwardRef(() => AuthRescueModule),
    forwardRef(() => ClientUserModule),
    forwardRef(() => ClientTenantModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '30d' },
    }),
  ],
  providers: [ClientAuthRescueService],
  controllers: [ClientAuthRescueController],
  exports: [ClientAuthRescueService],
})
export class ClientAuthRescueModule {}

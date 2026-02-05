// otp.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminAuthRescueController } from './admin-auth-rescue.controller';
import { AdminAuthRescueService } from './admin-auth-rescue.service';
import { AuthModule } from '@/module/core/auth/auth/auth.module';
import { AuthRescueModule } from '@/module/core/auth/auth-rescue/auth-rescue.module';
import { UserModule } from '@/module/core/user/user/user.module';

@Module({
  imports: [forwardRef(() => AuthRescueModule), forwardRef(() => UserModule)],
  providers: [AdminAuthRescueService],
  controllers: [AdminAuthRescueController],
  exports: [AdminAuthRescueService],
})
export class AdminAuthRescueModule {}

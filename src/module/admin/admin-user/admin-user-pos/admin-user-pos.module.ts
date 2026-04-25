// admin-pos.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from '@/module/core/user/user/schema/user.schema';
import { UserPosModule } from '@/module/core/user/user-pos/user_pos.module';
import { AdminUserPosController } from './admin-user-pos.controller';
import { AdminUserPosService } from './admin-user-pos.service';
import { InterceptorModule } from '@/interceptors/interceptors.module';
import { TenantSubscriptionUsageModule } from '@/module/core/tenant-subscription-usage/tenant-subscription-usage.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
    forwardRef(() => UserPosModule),
    InterceptorModule,
    TenantSubscriptionUsageModule,
  ],
  providers: [AdminUserPosService],
  controllers: [AdminUserPosController],
  exports: [AdminUserPosService],
})
export class AdminUserPosModule {}

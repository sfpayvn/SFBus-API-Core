// admin-tenant-operator.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from '@/module/core/user/user/schema/user.schema';
import { UserTenantOperatorModule } from '@/module/core/user/user-tenant-operator/user-tenant-operator.module';
import { AdminUserTenantOperatorController } from './admin-user-tenant-operator.controller';
import { AdminUserTenantOperatorService } from './admin-user-tenant-operator.service';
import { InterceptorModule } from '@/interceptors/interceptors.module';
import { TenantSubscriptionUsageModule } from '@/module/core/tenant-subscription-usage/tenant-subscription-usage.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
    forwardRef(() => UserTenantOperatorModule),
    InterceptorModule,
    TenantSubscriptionUsageModule,
  ],
  providers: [AdminUserTenantOperatorService],
  controllers: [AdminUserTenantOperatorController],
  exports: [AdminUserTenantOperatorService],
})
export class AdminUserTenantOperatorModule {}

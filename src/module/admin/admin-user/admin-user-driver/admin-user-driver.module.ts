// admin-driver.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from '@/module/core/user/user/schema/user.schema';
import { UserDriverModule } from '@/module/core/user/user-driver/user-driver.module';
import { AdminUserDriverController } from './admin-user-driver.controller';
import { AdminUserDriverService } from './admin-user-driver.service';
import { InterceptorModule } from '@/interceptors/interceptors.module';
import { TenantSubscriptionUsageModule } from '@/module/core/tenant-subscription-usage/tenant-subscription-usage.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
    forwardRef(() => UserDriverModule),
    InterceptorModule,
    TenantSubscriptionUsageModule,
  ],
  providers: [AdminUserDriverService],
  controllers: [AdminUserDriverController],
  exports: [AdminUserDriverService],
})
export class AdminUserDriverModule {}

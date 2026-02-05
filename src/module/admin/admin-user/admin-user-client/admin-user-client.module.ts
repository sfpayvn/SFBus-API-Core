// admin-client.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from '@/module/core/user/user/schema/user.schema';
import { AdminUserClientController } from './admin-user-client.controller';
import { AdminUserClientService } from './admin-user-client.service';
import { UserClientModule } from '@/module/core/user/user-client/user_client.module';
import { InterceptorModule } from '@/interceptors/interceptors.module';
import { TenantSubscriptionUsageModule } from '@/module/core/tenant-subscription-usage/tenant-subscription-usage.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
    forwardRef(() => UserClientModule),
    InterceptorModule,
    TenantSubscriptionUsageModule,
  ],
  providers: [AdminUserClientService],
  controllers: [AdminUserClientController],
  exports: [AdminUserClientService],
})
export class AdminUserClientModule {}

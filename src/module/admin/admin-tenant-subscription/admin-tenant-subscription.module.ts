import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminTenantSubscriptionController } from './admin-tenant-subscription.controller';
import { AdminTenantSubscriptionService } from './admin-tenant-subscription.service';
import { TenantSubscriptionModule } from '@/module/core/tenant-subscription/tenant-subscription.module';

@Module({
  imports: [forwardRef(() => TenantSubscriptionModule)],
  controllers: [AdminTenantSubscriptionController],
  providers: [AdminTenantSubscriptionService],
  exports: [AdminTenantSubscriptionService], // nếu nơi khác cần gọi service này
})
export class AdminTenantSubscriptionModule {}

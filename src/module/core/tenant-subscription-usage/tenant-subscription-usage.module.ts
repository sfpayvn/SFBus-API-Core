import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { TenantSubscriptionUsageController } from './tenant-subscription-usage.controller';
import { TenantSubscriptionUsageService } from './tenant-subscription-usage.service';
import {
  TenantSubscriptionUsageDocument,
  TenantSubscriptionUsageSchema,
} from './schema/tenant-subscription-usage.schema';
import { SubscriptionModule } from '../subscription/subscription.module';
import { TenantSubscriptionModule } from '../tenant-subscription/tenant-subscription.module';
import {
  TenantSubscriptionDocument,
  TenantSubscriptionSchema,
} from '../tenant-subscription/schema/tenant-subscription.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TenantSubscriptionUsageDocument.name, schema: TenantSubscriptionUsageSchema },
      { name: TenantSubscriptionDocument.name, schema: TenantSubscriptionSchema },
    ]),
    forwardRef(() => TenantSubscriptionModule),
  ],
  controllers: [TenantSubscriptionUsageController],
  providers: [TenantSubscriptionUsageService],
  exports: [TenantSubscriptionUsageService, MongooseModule],
})
export class TenantSubscriptionUsageModule {}

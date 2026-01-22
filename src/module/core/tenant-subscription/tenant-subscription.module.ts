import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TenantSubscriptionService } from './tenant-subscription.service';
import { TenantSubscriptionController } from './tenant-subscription.controller';

import { TenantSubscriptionDocument, TenantSubscriptionSchema } from './schema/tenant-subscription.schema';
import { TenantModule } from '../tenant/tenant.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { SubscriptionDocument, SubscriptionSchema } from '../subscription/schema/subscription.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TenantSubscriptionDocument.name, schema: TenantSubscriptionSchema },
      { name: SubscriptionDocument.name, schema: SubscriptionSchema },
    ]),
    forwardRef(() => TenantModule),
    forwardRef(() => SubscriptionModule),
  ],
  controllers: [TenantSubscriptionController],
  providers: [TenantSubscriptionService],
  exports: [TenantSubscriptionService], // nếu nơi khác cần gọi service này
})
export class TenantSubscriptionModule {}

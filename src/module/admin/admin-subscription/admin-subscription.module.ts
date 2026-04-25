import { Module } from '@nestjs/common';
import { AdminSubscriptionController } from './admin-subscription.controller';
import { AdminSubscriptionService } from './admin-subscription.service';
import { SubscriptionModule } from '../../core/subscription/subscription.module';

@Module({
  imports: [SubscriptionModule],
  controllers: [AdminSubscriptionController],
  providers: [AdminSubscriptionService],
  exports: [AdminSubscriptionService],
})
export class AdminSubscriptionModule {}

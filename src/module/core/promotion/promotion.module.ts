import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromotionService } from './promotion-service';
import { PromotionDocument, PromotionSchema } from './schema/promotion.schema';
import { PromotionController } from './promotion.controller';
import { BookingModule } from '../booking/booking.module';
import { BusScheduleModule } from '../bus/bus-schedule/bus-schedule.module';
import { PaymentModule } from '../payment/payment.module';
import { TenantSubscriptionUsageModule } from '../tenant-subscription-usage/tenant-subscription-usage.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PromotionDocument.name, schema: PromotionSchema }]),
    forwardRef(() => BusScheduleModule),
    forwardRef(() => PaymentModule),
    forwardRef(() => BookingModule),
    TenantSubscriptionUsageModule,
  ],
  providers: [PromotionService],
  controllers: [PromotionController],
  exports: [PromotionService],
})
export class PromotionModule {}

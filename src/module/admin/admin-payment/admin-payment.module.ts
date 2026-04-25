import { PaymentDocument, PaymentSchema } from '@/module/core/payment/schema/payment.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminPaymentService } from './admin-payment-service';
import { AdminPaymentController } from './admin-payment.controller';
import { PaymentModule } from '@/module/core/payment/payment.module';
import { AdminTrackingModule } from '../admin-tracking/admin-tracking.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PaymentDocument.name, schema: PaymentSchema }]),
    forwardRef(() => PaymentModule),
    forwardRef(() => AdminTrackingModule),
  ],
  controllers: [AdminPaymentController],
  providers: [AdminPaymentService],
  exports: [AdminPaymentService],
})
export class AdminPaymentModule {}

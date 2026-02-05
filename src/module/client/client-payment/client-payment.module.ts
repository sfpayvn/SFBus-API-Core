import { PaymentDocument, PaymentSchema } from '@/module/core/payment/schema/payment.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientPaymentService } from './client-payment-service';
import { ClientBookingModule } from '../client-booking/client-booking.module';
import { BookingModule } from '@/module/core/booking/booking.module';
import { PaymentModule } from '@/module/core/payment/payment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PaymentDocument.name, schema: PaymentSchema }]),
    forwardRef(() => ClientBookingModule),
    forwardRef(() => BookingModule),
    forwardRef(() => PaymentModule),
  ],
  providers: [ClientPaymentService],
  exports: [ClientPaymentService],
})
export class ClientPaymentModule {}

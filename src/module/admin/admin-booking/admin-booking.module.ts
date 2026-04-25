import { BookingDocument, BookingSchema } from '@/module/core/booking/schema/booking.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminBookingController } from './admin-booking.controller';
import { AdminBookingService } from './admin-booking-service';
import { AdminBookingGateway } from './admin-booking.gateway';
import { BookingModule } from '@/module/core/booking/booking.module';
import { AdminPaymentModule } from '../admin-payment/admin-payment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookingDocument.name, schema: BookingSchema }]),
    forwardRef(() => BookingModule),
    forwardRef(() => AdminPaymentModule),
  ],
  controllers: [AdminBookingController],
  providers: [AdminBookingService, AdminBookingGateway],
  exports: [AdminBookingService],
})
export class AdminBookingModule {}

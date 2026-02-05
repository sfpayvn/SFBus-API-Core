import { BookingDocument, BookingSchema } from '@/module/core/booking/schema/booking.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientBookingController } from './client-booking.controller';
import { ClientBookingService } from './client-booking-service';
import { ClientBookingGateway } from './client-booking.gateway';
import { BookingModule } from '@/module/core/booking/booking.module';
import { ClientPaymentModule } from '../client-payment/client-payment.module';
import { ClientTrackingModule } from '../client-tracking/client-tracking.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookingDocument.name, schema: BookingSchema }]),
    forwardRef(() => BookingModule),
    forwardRef(() => ClientPaymentModule),
    ClientTrackingModule,
  ],
  controllers: [ClientBookingController],
  providers: [ClientBookingService, ClientBookingGateway],
  exports: [ClientBookingService],
})
export class ClientBookingModule {}

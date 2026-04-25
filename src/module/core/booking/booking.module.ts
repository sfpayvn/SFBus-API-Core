import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingController } from './booking.controller';
import { BookingDocument, BookingSchema } from './schema/booking.schema';
import { BookingService } from './booking-service';
import { BookingGateway } from './booking.gateway';
import { PaymentModule } from '../payment/payment.module';
import { BusScheduleModule } from '../bus/bus-schedule/bus-schedule.module';
import { CounterModule } from '../counter/counter.module';
import { BusScheduleLayoutModule } from '../bus/bus-schedule-layout/bus-schedule-layout.module';
import { PaymentMethodModule } from '../payment-method/payment-method.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookingDocument.name, schema: BookingSchema }]),
    forwardRef(() => BusScheduleModule),
    forwardRef(() => CounterModule),
    forwardRef(() => PaymentModule),
    forwardRef(() => PaymentMethodModule),
    forwardRef(() => BusScheduleLayoutModule),
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingGateway],
  exports: [BookingService],
})
export class BookingModule {}

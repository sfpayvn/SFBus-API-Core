import { forwardRef, Module } from '@nestjs/common';
import { PaymentService } from './payment-service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentDocument, PaymentSchema } from './schema/payment.schema';
import { PaymentController } from './payment.controller';
import { BookingModule } from '../booking/booking.module';
import { BusScheduleLayoutModule } from '../bus/bus-schedule-layout/bus-schedule-layout.module';
import { GoodsModule } from '../goods/goods/goods.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PaymentDocument.name, schema: PaymentSchema }]),
    forwardRef(() => BookingModule),
    forwardRef(() => GoodsModule),
    forwardRef(() => BusScheduleLayoutModule),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}

import { forwardRef, Module } from '@nestjs/common';
import { PaymentMethodService } from './payment-method-service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentMethodDocument, PaymentMethodSchema } from './schema/payment-method.schema';
import { PaymentMethodController } from './payment-method.controller';
import { BookingModule } from '../booking/booking.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PaymentMethodDocument.name, schema: PaymentMethodSchema }]),
    forwardRef(() => BookingModule),
  ],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}

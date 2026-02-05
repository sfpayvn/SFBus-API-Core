import { forwardRef, Module } from '@nestjs/common';
import { ClientPaymentMethodController } from './client-payment-method.controller';
import { ClientPaymentMethodService } from './client-payment-method-service';
import { PaymentMethodModule } from '@/module/core/payment-method/payment-method.module';

@Module({
  imports: [forwardRef(() => PaymentMethodModule)],
  controllers: [ClientPaymentMethodController],
  providers: [ClientPaymentMethodService],
  exports: [ClientPaymentMethodService],
})
export class ClientPaymentMethodModule {}

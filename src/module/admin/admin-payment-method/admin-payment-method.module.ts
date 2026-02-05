import { forwardRef, Module } from '@nestjs/common';
import { AdminPaymentMethodController } from './admin-payment-method.controller';
import { AdminPaymentMethodService } from './admin-payment-method-service';
import { PaymentMethodModule } from '@/module/core/payment-method/payment-method.module';

@Module({
  imports: [forwardRef(() => PaymentMethodModule)],
  controllers: [AdminPaymentMethodController],
  providers: [AdminPaymentMethodService],
  exports: [AdminPaymentMethodService],
})
export class AdminPaymentMethodModule {}

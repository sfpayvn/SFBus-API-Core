import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminFeeTaxService } from './admin-fee-tax-service';
import { AdminFeeTaxController } from './admin-fee-tax.controller';
import { FeeTax, FeeTaxSchema } from '@/module/core/fee-tax/schema/fee-tax.schema';
import { FeeTaxService } from '@/module/core/fee-tax/fee-tax.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: FeeTax.name, schema: FeeTaxSchema }])],
  controllers: [AdminFeeTaxController],
  providers: [AdminFeeTaxService, FeeTaxService],
  exports: [AdminFeeTaxService],
})
export class AdminFeeTaxModule {}

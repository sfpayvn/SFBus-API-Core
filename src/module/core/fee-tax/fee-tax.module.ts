import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeeTax, FeeTaxSchema } from './schema/fee-tax.schema';
import { FeeTaxService } from './fee-tax.service';
import { FeeTaxController } from './fee-tax.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: FeeTax.name, schema: FeeTaxSchema }])],
  controllers: [FeeTaxController],
  providers: [FeeTaxService],
  exports: [FeeTaxService],
})
export class FeeTaxModule {}

import { BusProvinceDocument, BusProvinceSchema } from '@/module/core/bus/bus-province/schema/bus-schema.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminBusProvinceController } from './admin-bus-province.controller';
import { AdminBusProvinceService } from './admin-bus-province.service';
import { BusProvinceModule } from '@/module/core/bus/bus-province/bus-province.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusProvinceDocument.name, schema: BusProvinceSchema }]),
    forwardRef(() => BusProvinceModule),
  ],
  controllers: [AdminBusProvinceController],
  providers: [AdminBusProvinceService],
  exports: [AdminBusProvinceService],
})
export class AdminBusProvinceModule {}

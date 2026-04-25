import { forwardRef, Module } from '@nestjs/common';
import { BusProvinceService } from './bus-province.service';
import { BusProvinceController } from './bus-province.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusProvinceDocument, BusProvinceSchema } from './schema/bus-schema.schema';
import { BusStationModule } from '../bus-station/bus-station.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusProvinceDocument.name, schema: BusProvinceSchema }]),
    forwardRef(() => BusStationModule),
  ],
  controllers: [BusProvinceController],
  providers: [BusProvinceService],
  exports: [BusProvinceService],
})
export class BusProvinceModule {}

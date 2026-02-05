import { forwardRef, Module } from '@nestjs/common';
import { AdminBusStationService } from './admin-bus-station.service';
import { AdminBusStationController } from './admin-bus-station.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusStationDocument, BusStationSchema } from '@/module/core/bus/bus-station/schema/bus-station.schema';
import { BusStationModule } from '@/module/core/bus/bus-station/bus-station.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusStationDocument.name, schema: BusStationSchema }]),
    forwardRef(() => BusStationModule),
  ],
  controllers: [AdminBusStationController],
  providers: [AdminBusStationService],
  exports: [AdminBusStationService],
})
export class AdminBusStationModule {}

import { forwardRef, Module } from '@nestjs/common';
import { ClientBusStationService } from './client-bus-station.service';
import { ClientBusStationController } from './client-bus-station.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusStationDocument, BusStationSchema } from '@/module/core/bus/bus-station/schema/bus-station.schema';
import { BusStationModule } from '@/module/core/bus/bus-station/bus-station.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusStationDocument.name, schema: BusStationSchema }]),
    forwardRef(() => BusStationModule),
  ],
  controllers: [ClientBusStationController],
  providers: [ClientBusStationService],
  exports: [ClientBusStationService],
})
export class ClientBusStationModule {}

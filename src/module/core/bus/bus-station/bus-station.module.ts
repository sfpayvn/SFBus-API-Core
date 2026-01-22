import { Module } from '@nestjs/common';
import { BusStationService } from './bus-station.service';
import { BusStationController } from './bus-station.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusStationDocument, BusStationSchema } from './schema/bus-station.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: BusStationDocument.name, schema: BusStationSchema }])],
  controllers: [BusStationController],
  providers: [BusStationService],
  exports: [BusStationService],
})
export class BusStationModule {}

import { Module } from '@nestjs/common';
import { BusServiceService } from './bus-service.service';
import { BusServiceController } from './bus-service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusServiceDocument, BusServiceSchema } from './schema/bus-service.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: BusServiceDocument.name, schema: BusServiceSchema }])],
  controllers: [BusServiceController],
  providers: [BusServiceService],
  exports: [BusServiceService],
})
export class BusServiceModule {}

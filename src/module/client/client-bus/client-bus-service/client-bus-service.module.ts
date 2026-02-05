import { BusServiceDocument, BusServiceSchema } from '@/module/core/bus/bus-service/schema/bus-service.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientBusServiceController } from './client-bus-service.controller';
import { ClientBusServiceService } from './client-bus-service.service';
import { BusServiceModule } from '@/module/core/bus/bus-service/bus-service.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusServiceDocument.name, schema: BusServiceSchema }]),
    forwardRef(() => BusServiceModule),
  ],
  controllers: [ClientBusServiceController],
  providers: [ClientBusServiceService],
  exports: [ClientBusServiceService],
})
export class ClientBusServiceModule {}

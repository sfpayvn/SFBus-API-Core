import { BusRouteDocument, BusRouteSchema } from '@/module/core/bus/bus-route/schema/bus-route.schema';
import { forwardRef, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ClientBusRouteController } from './client-bus-route.controller';
import { ClientBusRouteService } from './client-bus-route.service';
import { BusRouteModule } from '@/module/core/bus/bus-route/bus-route.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusRouteDocument.name, schema: BusRouteSchema }]),
    forwardRef(() => BusRouteModule),
  ],
  controllers: [ClientBusRouteController],
  providers: [ClientBusRouteService],
  exports: [ClientBusRouteService],
})
export class ClientBusRouteModule {}

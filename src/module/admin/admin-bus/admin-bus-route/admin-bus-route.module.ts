import { BusRouteDocument, BusRouteSchema } from '@/module/core/bus/bus-route/schema/bus-route.schema';
import { forwardRef, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AdminBusRouteController } from './admin-bus-route.controller';
import { AdminBusRouteService } from './admin-bus-route.service';
import { BusRouteModule } from '@/module/core/bus/bus-route/bus-route.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusRouteDocument.name, schema: BusRouteSchema }]),
    forwardRef(() => BusRouteModule),
  ],
  controllers: [AdminBusRouteController],
  providers: [AdminBusRouteService],
  exports: [AdminBusRouteService],
})
export class AdminBusRouteModule {}

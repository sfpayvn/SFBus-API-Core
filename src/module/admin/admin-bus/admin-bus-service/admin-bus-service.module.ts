import { BusServiceDocument, BusServiceSchema } from '@/module/core/bus/bus-service/schema/bus-service.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminBusServiceController } from './admin-bus-service.controller';
import { AdminBusServiceService } from './admin-bus-service.service';
import { BusServiceModule } from '@/module/core/bus/bus-service/bus-service.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusServiceDocument.name, schema: BusServiceSchema }]),
    forwardRef(() => BusServiceModule),
  ],
  controllers: [AdminBusServiceController],
  providers: [AdminBusServiceService],
  exports: [AdminBusServiceService],
})
export class AdminBusServiceModule {}

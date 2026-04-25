import { MongooseModule } from '@nestjs/mongoose';
import { AdminBusTypeController } from './admin-bus-type.controller';
import { AdminBusTypeService } from './admin-bus-type.service';
import { BusTypeDocument, BusTypeSchema } from '@/module/core/bus/bus-type/schema/bus-type.schema';
import { forwardRef, Module } from '@nestjs/common';
import { BusTypeModule } from '@/module/core/bus/bus-type/bus-type.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusTypeDocument.name, schema: BusTypeSchema }]),
    forwardRef(() => BusTypeModule),
  ],
  controllers: [AdminBusTypeController],
  providers: [AdminBusTypeService],
  exports: [AdminBusTypeService],
})
export class AdminBusTypeModule {}

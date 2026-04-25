import {
  BusScheduleLayoutDocument,
  BusScheduleLayoutSchema,
} from '@/module/core/bus/bus-schedule-layout/schema/bus-schedule-layout.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminBusScheduleLayoutController } from './admin-bus-schedule-layout.controller';
import { AdminBusScheduleLayoutService } from './admin-bus-schedule-layout.service';
import { BusScheduleLayoutModule } from '@/module/core/bus/bus-schedule-layout/bus-schedule-layout.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusScheduleLayoutDocument.name, schema: BusScheduleLayoutSchema }]),
    forwardRef(() => BusScheduleLayoutModule),
  ],
  controllers: [AdminBusScheduleLayoutController],
  providers: [AdminBusScheduleLayoutService],
  exports: [AdminBusScheduleLayoutService],
})
export class AdminBusScheduleLayoutModule {}

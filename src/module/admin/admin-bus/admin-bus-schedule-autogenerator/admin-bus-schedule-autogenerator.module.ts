import {
  BusScheduleAutogeneratorDocument,
  BusScheduleAutogeneratorSchema,
} from '@/module/core/bus/bus-schedule-autogenerator/schema/bus-schedule-autogenerator.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminBusScheduleAutogeneratorController } from './admin-bus-schedule-autogenerator.controller';
import { AdminBusScheduleAutogeneratorService } from './admin-bus-schedule-autogenerator.service';
import { BusScheduleAutogeneratorModule } from '@/module/core/bus/bus-schedule-autogenerator/bus-schedule-autogenerator.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BusScheduleAutogeneratorDocument.name, schema: BusScheduleAutogeneratorSchema },
    ]),
    forwardRef(() => BusScheduleAutogeneratorModule),
  ],
  controllers: [AdminBusScheduleAutogeneratorController],
  providers: [AdminBusScheduleAutogeneratorService],
  exports: [AdminBusScheduleAutogeneratorService],
})
export class AdminBusScheduleAutogeneratorModule {}

import { BusLayoutTemplateModule } from '@/module/core/bus/bus-layout-template/bus-layout-template.module';
import {
  BusScheduleTemplateDocument,
  BusScheduleTemplateSchema,
} from '@/module/core/bus/bus-schedule-template/schema/bus-schedule-template.schema';
import { BusModule } from '@/module/core/bus/bus/bus.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminBusScheduleTemplateController } from './admin-bus-schedule-template.controller';
import { AdminBusScheduleTemplateService } from './admin-bus-schedule-template.service';
import { AdminBusLayoutTemplateModule } from '../admin-bus-layout-template/admin-bus-layout-template.module';
import { AdminBusModule } from '../admin-bus-main/admin-bus.module';
import { BusScheduleTemplateModule } from '@/module/core/bus/bus-schedule-template/bus-schedule-template.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusScheduleTemplateDocument.name, schema: BusScheduleTemplateSchema }]),
    forwardRef(() => AdminBusLayoutTemplateModule),
    forwardRef(() => AdminBusModule),
    forwardRef(() => BusScheduleTemplateModule),
  ],
  controllers: [AdminBusScheduleTemplateController],
  providers: [AdminBusScheduleTemplateService],
  exports: [AdminBusScheduleTemplateService],
})
export class AdminBusScheduleTemplateModule {}

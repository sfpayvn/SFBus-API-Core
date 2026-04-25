import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusScheduleTemplateService } from './bus-schedule-template.service';
import { BusScheduleTemplateController } from './bus-schedule-template.controller';
import { BusScheduleTemplateDocument, BusScheduleTemplateSchema } from './schema/bus-schedule-template.schema';
import { BusModule } from '../bus/bus.module';
import {} from '../bus-schedule-layout/bus-schedule-layout.module';
import { BusLayoutTemplateModule } from '../bus-layout-template/bus-layout-template.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusScheduleTemplateDocument.name, schema: BusScheduleTemplateSchema }]),
    forwardRef(() => BusLayoutTemplateModule),
    forwardRef(() => BusModule),
  ],
  controllers: [BusScheduleTemplateController],
  providers: [BusScheduleTemplateService],
  exports: [BusScheduleTemplateService],
})
export class BusScheduleTemplateModule {}

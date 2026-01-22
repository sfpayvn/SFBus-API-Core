import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusScheduleAutogeneratorService } from './bus-schedule-autogenerator.service';
import {
  BusScheduleAutogeneratorDocument,
  BusScheduleAutogeneratorSchema,
} from './schema/bus-schedule-autogenerator.schema';
import { BusScheduleAutogeneratorController } from './bus-schedule-autogenerator.controller';
import { BusScheduleTemplateModule } from '../bus-schedule-template/bus-schedule-template.module';
import { BusScheduleModule } from '../bus-schedule/bus-schedule.module';
import { BusTemplateModule } from '../bus-template/bus-template.module';
import { BusModule } from '../bus/bus.module';
import { BusRouteModule } from '../bus-route/bus-route.module';
import { BusStationModule } from '../bus-station/bus-station.module';
import { BusProvinceModule } from '../bus-province/bus-province.module';
import { AutoJobTrackingModule } from '../../auto-job-tracking';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BusScheduleAutogeneratorDocument.name, schema: BusScheduleAutogeneratorSchema },
    ]),
    forwardRef(() => BusScheduleTemplateModule),
    forwardRef(() => BusScheduleModule),
    forwardRef(() => BusTemplateModule),
    forwardRef(() => BusModule),
    forwardRef(() => BusRouteModule),
    forwardRef(() => BusStationModule),
    forwardRef(() => BusProvinceModule),
    forwardRef(() => AutoJobTrackingModule),
  ],
  controllers: [BusScheduleAutogeneratorController],
  providers: [BusScheduleAutogeneratorService],
  exports: [BusScheduleAutogeneratorService],
})
export class BusScheduleAutogeneratorModule {}

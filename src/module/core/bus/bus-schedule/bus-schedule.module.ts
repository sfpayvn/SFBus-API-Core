import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusScheduleService } from './bus-schedule.service';
import { BusScheduleController } from './bus-schedule.controller';
import { BusScheduleDocument, BusScheduleSchema } from './schema/bus-schedule.schema';
import { BusModule } from '../bus/bus.module';
import { BusScheduleLayoutModule } from '../bus-schedule-layout/bus-schedule-layout.module';
import { BusLayoutTemplateModule } from '../bus-layout-template/bus-layout-template.module';
import { SettingsModule } from '../../settings/settings.module';
import { DriverModule } from '@/module/core/user/driver/driver.module';
import { TrackingModule } from '../../tracking/tracking.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusScheduleDocument.name, schema: BusScheduleSchema }]),
    forwardRef(() => BusScheduleLayoutModule),
    forwardRef(() => BusLayoutTemplateModule),
    forwardRef(() => BusModule),
    forwardRef(() => DriverModule),
    forwardRef(() => SettingsModule),
    forwardRef(() => TrackingModule),
  ],
  controllers: [BusScheduleController],
  providers: [BusScheduleService],
  exports: [BusScheduleService],
})
export class BusScheduleModule {}

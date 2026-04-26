import { forwardRef, Module } from '@nestjs/common';
import { AutoJobService } from './auto-job.service';
import { AutoJobController } from './auto-job.controller';
import { AutoJobTrackingModule } from '../auto-job-tracking/auto-job-tracking.module';
import { TenantSubscriptionModule } from '../tenant-subscription/tenant-subscription.module';
import { BusScheduleAutogeneratorModule } from '../bus/bus-schedule-autogenerator/bus-schedule-autogenerator.module';

@Module({
  imports: [
    forwardRef(() => AutoJobTrackingModule),
    forwardRef(() => TenantSubscriptionModule),
    forwardRef(() => BusScheduleAutogeneratorModule),
  ],
  controllers: [AutoJobController],
  providers: [AutoJobService],
  exports: [AutoJobService],
})
export class AutoJobModule {}

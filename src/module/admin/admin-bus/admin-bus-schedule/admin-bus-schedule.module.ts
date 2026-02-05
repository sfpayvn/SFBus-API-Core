import { BusScheduleDocument, BusScheduleSchema } from '@/module/core/bus/bus-schedule/schema/bus-schedule.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminBusScheduleController } from './admin-bus-schedule.controller';
import { AdminBusScheduleService } from './admin-bus-schedule.service';
import { BusScheduleModule } from '@/module/core/bus/bus-schedule/bus-schedule.module';
import { TenantSubscriptionUsageModule } from '@/module/core/tenant-subscription-usage/tenant-subscription-usage.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusScheduleDocument.name, schema: BusScheduleSchema }]),
    forwardRef(() => BusScheduleModule),
    TenantSubscriptionUsageModule,
  ],
  controllers: [AdminBusScheduleController],
  providers: [AdminBusScheduleService],
  exports: [AdminBusScheduleService],
})
export class AdminBusScheduleModule {}

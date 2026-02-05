import {
  BusScheduleLayoutDocument,
  BusScheduleLayoutSchema,
} from '@/module/core/bus/bus-schedule-layout/schema/bus-schedule-layout.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientBusScheduleLayoutController } from './client-bus-schedule-layout.controller';
import { ClientBusScheduleLayoutService } from './client-bus-schedule-layout.service';
import { BusScheduleLayoutModule } from '@/module/core/bus/bus-schedule-layout/bus-schedule-layout.module';
import { ClientTenantModule } from '../../client-tenant/client-tenant.module';
import { TenantModule } from '@/module/core/tenant/tenant.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusScheduleLayoutDocument.name, schema: BusScheduleLayoutSchema }]),
    forwardRef(() => BusScheduleLayoutModule),
    forwardRef(() => ClientTenantModule),
    forwardRef(() => TenantModule),
  ],
  controllers: [ClientBusScheduleLayoutController],
  providers: [ClientBusScheduleLayoutService],
  exports: [ClientBusScheduleLayoutService],
})
export class ClientBusScheduleLayoutModule {}

import { BusScheduleDocument, BusScheduleSchema } from '@/module/core/bus/bus-schedule/schema/bus-schedule.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientBusScheduleController } from './client-bus-schedule.controller';
import { ClientBusScheduleService } from './client-bus-schedule.service';
import { BusScheduleModule } from '@/module/core/bus/bus-schedule/bus-schedule.module';
import { ClientTenantModule } from '../../client-tenant/client-tenant.module';
import { TenantModule } from '@/module/core/tenant/tenant.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusScheduleDocument.name, schema: BusScheduleSchema }]),
    forwardRef(() => BusScheduleModule),
    forwardRef(() => ClientTenantModule),
    forwardRef(() => TenantModule),
  ],
  controllers: [ClientBusScheduleController],
  providers: [ClientBusScheduleService],
  exports: [ClientBusScheduleService],
})
export class ClientBusScheduleModule {}

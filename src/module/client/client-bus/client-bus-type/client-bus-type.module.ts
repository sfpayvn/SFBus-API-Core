import { MongooseModule } from '@nestjs/mongoose';
import { ClientBusTypeController } from './client-bus-type.controller';
import { ClientBusTypeService } from './client-bus-type.service';
import { BusTypeDocument, BusTypeSchema } from '@/module/core/bus/bus-type/schema/bus-type.schema';
import { forwardRef, Module } from '@nestjs/common';
import { BusTypeModule } from '@/module/core/bus/bus-type/bus-type.module';
import { ClientTenantModule } from '../../client-tenant/client-tenant.module';
import { TenantModule } from '@/module/core/tenant/tenant.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusTypeDocument.name, schema: BusTypeSchema }]),
    forwardRef(() => BusTypeModule),
    forwardRef(() => ClientTenantModule),
    forwardRef(() => TenantModule),
  ],
  controllers: [ClientBusTypeController],
  providers: [ClientBusTypeService],
  exports: [ClientBusTypeService],
})
export class ClientBusTypeModule {}

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSeatTypeController } from './client-seat-type.controller';
import { ClientSeatTypeService } from './client-seat-type.service';
import { SeatTypeDocument, SeatTypeSchema } from '@/module/core/seat/seat-type/schema/seat-type.schema';
import { SeatTypeModule } from '@/module/core/seat/seat-type/seat-type.module';
import { ClientTenantModule } from '../../client-tenant/client-tenant.module';
import { TenantModule } from '@/module/core/tenant/tenant.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SeatTypeDocument.name, schema: SeatTypeSchema }]),
    forwardRef(() => SeatTypeModule),
    forwardRef(() => ClientTenantModule),
    forwardRef(() => TenantModule),
  ],
  controllers: [ClientSeatTypeController],
  providers: [ClientSeatTypeService],
  exports: [ClientSeatTypeService],
})
export class ClientSeatTypeModule {}

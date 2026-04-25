import { BusServiceModule } from '@/module/core/bus/bus-service/bus-service.module';
import { BusTemplateDocument, BusTemplateSchema } from '@/module/core/bus/bus-template/schema/bus-template.schema';
import { BusTypeModule } from '@/module/core/bus/bus-type/bus-type.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientBusTemplateController } from './client-bus-template.controller';
import { ClientBusTemplateService } from './client-bus-template.service';
import { ClientBusTypeModule } from '../client-bus-type/client-bus-type.module';
import { ClientBusServiceModule } from '../client-bus-service/client-bus-service.module';
import { BusTemplateModule } from '@/module/core/bus/bus-template/bus-template.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusTemplateDocument.name, schema: BusTemplateSchema }]),
    forwardRef(() => ClientBusServiceModule),
    forwardRef(() => ClientBusTypeModule),
    forwardRef(() => BusTemplateModule),
  ],
  controllers: [ClientBusTemplateController],
  providers: [ClientBusTemplateService],
  exports: [ClientBusTemplateService],
})
export class ClientBusTemplateModule {}

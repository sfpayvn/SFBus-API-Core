import {
  BusLayoutTemplateDocument,
  BusLayoutTemplateSchema,
} from '@/module/core/bus/bus-layout-template/schema/bus-layout-template.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientBusLayoutTemplateController } from './client-bus-layout-template.controller';
import { ClientBusLayoutTemplateService } from './client-bus-layout-template.service';
import { BusLayoutTemplateModule } from '@/module/core/bus/bus-layout-template/bus-layout-template.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusLayoutTemplateDocument.name, schema: BusLayoutTemplateSchema }]),
    forwardRef(() => BusLayoutTemplateModule),
  ],
  controllers: [ClientBusLayoutTemplateController],
  providers: [ClientBusLayoutTemplateService],
  exports: [ClientBusLayoutTemplateService],
})
export class ClientBusLayoutTemplateModule {}

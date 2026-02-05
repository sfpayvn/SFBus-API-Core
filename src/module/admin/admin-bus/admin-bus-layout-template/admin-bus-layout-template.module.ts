import {
  BusLayoutTemplateDocument,
  BusLayoutTemplateSchema,
} from '@/module/core/bus/bus-layout-template/schema/bus-layout-template.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminBusLayoutTemplateController } from './admin-bus-layout-template.controller';
import { AdminBusLayoutTemplateService } from './admin-bus-layout-template.service';
import { BusLayoutTemplateModule } from '@/module/core/bus/bus-layout-template/bus-layout-template.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusLayoutTemplateDocument.name, schema: BusLayoutTemplateSchema }]),
    forwardRef(() => BusLayoutTemplateModule),
  ],
  controllers: [AdminBusLayoutTemplateController],
  providers: [AdminBusLayoutTemplateService],
  exports: [AdminBusLayoutTemplateService],
})
export class AdminBusLayoutTemplateModule {}

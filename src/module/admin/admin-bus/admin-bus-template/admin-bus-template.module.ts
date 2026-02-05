import { BusServiceModule } from '@/module/core/bus/bus-service/bus-service.module';
import { BusTemplateDocument, BusTemplateSchema } from '@/module/core/bus/bus-template/schema/bus-template.schema';
import { BusTypeModule } from '@/module/core/bus/bus-type/bus-type.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminBusTemplateController } from './admin-bus-template.controller';
import { AdminBusTemplateService } from './admin-bus-template.service';
import { AdminBusTypeModule } from '../admin-bus-type/admin-bus-type.module';
import { AdminBusServiceModule } from '../admin-bus-service/admin-bus-service.module';
import { BusTemplateModule } from '@/module/core/bus/bus-template/bus-template.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusTemplateDocument.name, schema: BusTemplateSchema }]),
    forwardRef(() => AdminBusServiceModule),
    forwardRef(() => AdminBusTypeModule),
    forwardRef(() => BusTemplateModule),
  ],
  controllers: [AdminBusTemplateController],
  providers: [AdminBusTemplateService],
  exports: [AdminBusTemplateService],
})
export class AdminBusTemplateModule {}

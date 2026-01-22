import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusTemplateService } from './bus-template.service';
import { BusTemplateController } from './bus-template.controller';
import { BusTemplateDocument, BusTemplateSchema } from './schema/bus-template.schema';
import { BusServiceModule } from '../bus-service/bus-service.module';
import { BusTypeModule } from '../bus-type/bus-type.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusTemplateDocument.name, schema: BusTemplateSchema }]),
    forwardRef(() => BusServiceModule),
    forwardRef(() => BusTypeModule),
  ],
  controllers: [BusTemplateController],
  providers: [BusTemplateService],
  exports: [BusTemplateService],
})
export class BusTemplateModule {}

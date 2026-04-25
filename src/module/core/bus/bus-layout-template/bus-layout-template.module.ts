import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusLayoutTemplateDocument, BusLayoutTemplateSchema } from './schema/bus-layout-template.schema';
import { BusLayoutTemplateController } from './bus-layout-template.controller';
import { BusLayoutTemplateService } from './bus-layout-template.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: BusLayoutTemplateDocument.name, schema: BusLayoutTemplateSchema }])],
  controllers: [BusLayoutTemplateController],
  providers: [BusLayoutTemplateService],
  exports: [BusLayoutTemplateService],
})
export class BusLayoutTemplateModule {}

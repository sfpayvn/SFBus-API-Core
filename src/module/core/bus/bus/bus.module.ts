import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { BusDocument, BusSchema } from './schema/bus.schema';
import { BusServiceModule } from '../bus-service/bus-service.module';
import { BusTypeModule } from '../bus-type/bus-type.module';
import { BusTemplateModule } from '../bus-template/bus-template.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusDocument.name, schema: BusSchema }]),
    forwardRef(() => BusServiceModule),
    forwardRef(() => BusTypeModule),
    forwardRef(() => BusTemplateModule),
  ],
  controllers: [BusController],
  providers: [BusService],
  exports: [BusService],
})
export class BusModule {}

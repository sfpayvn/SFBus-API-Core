import { Module } from '@nestjs/common';
import { BusTypeService } from './bus-type.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BusTypeController } from './bus-type.controller';
import { BusTypeDocument, BusTypeSchema } from './schema/bus-type.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: BusTypeDocument.name, schema: BusTypeSchema }])],
  controllers: [BusTypeController],
  providers: [BusTypeService],
  exports: [BusTypeService],
})
export class BusTypeModule {}

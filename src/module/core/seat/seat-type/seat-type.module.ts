import { Module } from '@nestjs/common';
import { SeatTypeService } from './seat-type.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SeatTypeController } from './seat-type.controller';
import { SeatTypeDocument, SeatTypeSchema } from './schema/seat-type.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SeatTypeDocument.name, schema: SeatTypeSchema }])],
  controllers: [SeatTypeController],
  providers: [SeatTypeService],
  exports: [SeatTypeService],
})
export class SeatTypeModule {}

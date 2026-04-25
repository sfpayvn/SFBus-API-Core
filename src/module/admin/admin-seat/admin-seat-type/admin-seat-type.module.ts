import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSeatTypeController } from './admin-seat-type.controller';
import { AdminSeatTypeService } from './admin-seat-type.service';
import { SeatTypeDocument, SeatTypeSchema } from '@/module/core/seat/seat-type/schema/seat-type.schema';
import { SeatTypeModule } from '@/module/core/seat/seat-type/seat-type.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SeatTypeDocument.name, schema: SeatTypeSchema }]),
    forwardRef(() => SeatTypeModule),
  ],
  controllers: [AdminSeatTypeController],
  providers: [AdminSeatTypeService],
  exports: [AdminSeatTypeService],
})
export class AdminSeatTypeModule {}

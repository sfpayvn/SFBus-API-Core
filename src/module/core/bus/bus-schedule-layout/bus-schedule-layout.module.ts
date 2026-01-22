import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusScheduleLayoutController } from './bus-schedule-layout.controller';
import { BusScheduleLayoutService } from './bus-schedule-layout.service';
import { BusScheduleLayoutDocument, BusScheduleLayoutSchema } from './schema/bus-schedule-layout.schema';
import { BookingModule } from '../../booking/booking.module';
import { SeatTypeModule } from '../../seat/seat-type/seat-type.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusScheduleLayoutDocument.name, schema: BusScheduleLayoutSchema }]),
    forwardRef(() => BookingModule), // Use forwardRef to avoid circular dependency
    forwardRef(() => SeatTypeModule), // Use forwardRef to avoid circular dependency
  ],
  controllers: [BusScheduleLayoutController],
  providers: [BusScheduleLayoutService],
  exports: [BusScheduleLayoutService],
})
export class BusScheduleLayoutModule {}

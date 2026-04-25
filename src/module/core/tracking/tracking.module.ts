import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';
import { TrackingDocument, TrackingSchema } from './schema/tracking.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TrackingDocument.name, schema: TrackingSchema }])],
  controllers: [TrackingController],
  providers: [TrackingService],
  exports: [TrackingService],
})
export class TrackingModule {}

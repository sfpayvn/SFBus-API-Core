import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutoJobTrackingService } from './auto-job-tracking.service';
import { AutoJobTrackingController } from './auto-job-tracking.controller';
import { AutoJobTrackingSchema } from './schema/auto-job-tracking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'AutoJobTracking',
        schema: AutoJobTrackingSchema,
      },
    ]),
  ],
  controllers: [AutoJobTrackingController],
  providers: [AutoJobTrackingService],
  exports: [AutoJobTrackingService],
})
export class AutoJobTrackingModule {}

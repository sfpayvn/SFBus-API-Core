import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutoJobTrackingService } from './auto-job-tracking.service';
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
  providers: [AutoJobTrackingService],
  exports: [AutoJobTrackingService],
})
export class AutoJobTrackingModule {}

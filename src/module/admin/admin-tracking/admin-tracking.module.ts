import { Module } from '@nestjs/common';
import { AdminTrackingController } from './admin-tracking.controller';
import { AdminTrackingService } from './admin-tracking.service';
import { TrackingModule } from '@/module/core/tracking/tracking.module';

@Module({
  imports: [TrackingModule],
  controllers: [AdminTrackingController],
  providers: [AdminTrackingService],
  exports: [AdminTrackingService],
})
export class AdminTrackingModule {}

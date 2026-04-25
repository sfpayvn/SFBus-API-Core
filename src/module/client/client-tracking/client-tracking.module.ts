import { Module } from '@nestjs/common';
import { ClientTrackingController } from './client-tracking.controller';
import { ClientTrackingService } from './client-tracking.service';
import { TrackingModule } from '@/module/core/tracking/tracking.module';

@Module({
  imports: [TrackingModule],
  controllers: [ClientTrackingController],
  providers: [ClientTrackingService],
  exports: [ClientTrackingService],
})
export class ClientTrackingModule {}

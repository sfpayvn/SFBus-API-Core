import { Module } from '@nestjs/common';
import { DriverSettingsController } from './driver-settings.controller';
import { SettingsModule } from '../../core/settings/settings.module';
import { DriverAppVersionService } from './services/app-version.service';

@Module({
  imports: [SettingsModule],
  controllers: [DriverSettingsController],
  providers: [DriverAppVersionService],
  exports: [DriverAppVersionService],
})
export class DriverSettingsModule {}

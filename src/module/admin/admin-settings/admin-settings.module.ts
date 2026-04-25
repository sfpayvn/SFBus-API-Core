import { Module } from '@nestjs/common';
import { AdminSettingsController } from './admin-settings.controller';
import { SettingsModule } from '../../core/settings/settings.module';
import { AdminAppVersionService } from './services/app-version.service';

@Module({
  imports: [SettingsModule],
  controllers: [AdminSettingsController],
  providers: [AdminAppVersionService],
  exports: [AdminAppVersionService],
})
export class AdminSettingsModule {}

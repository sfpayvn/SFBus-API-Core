import { Module } from '@nestjs/common';
import { AdminSettingsController } from './admin-settings.controller';
import { SettingsModule } from '../../core/settings/settings.module';

@Module({
  imports: [SettingsModule],
  controllers: [AdminSettingsController],
})
export class AdminSettingsModule {}

import { Module } from '@nestjs/common';
import { PosSettingsController } from './pos-settings.controller';
import { SettingsModule } from '../../core/settings/settings.module';
import { PosAppVersionService } from './services/app-version.service';

@Module({
  imports: [SettingsModule],
  controllers: [PosSettingsController],
  providers: [PosAppVersionService],
  exports: [PosAppVersionService],
})
export class PosSettingsModule {}

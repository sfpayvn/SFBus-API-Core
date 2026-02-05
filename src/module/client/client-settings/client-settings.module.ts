import { forwardRef, Module } from '@nestjs/common';
import { ClientSettingsController } from './client-settings.controller';
import { SettingsModule } from '../../core/settings/settings.module';
import { ClientTenantModule } from '../client-tenant/client-tenant.module';
import { TenantModule } from '../../core/tenant/tenant.module';

@Module({
  imports: [SettingsModule, forwardRef(() => ClientTenantModule), forwardRef(() => TenantModule)],
  controllers: [ClientSettingsController],
})
export class ClientSettingsModule {}

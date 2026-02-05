import { Module } from '@nestjs/common';
import { ClientTenantService } from './client-tenant.service';
import { TenantModule } from '../../core/tenant/tenant.module';

@Module({
  imports: [TenantModule],
  providers: [ClientTenantService],
  exports: [ClientTenantService],
})
export class ClientTenantModule {}

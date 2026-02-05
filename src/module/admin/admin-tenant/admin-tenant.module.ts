import { Module } from '@nestjs/common';
import { AdminTenantController } from './admin-tenant.controller';
import { AdminTenantService } from './admin-tenant.service';
import { TenantModule } from '../../core/tenant/tenant.module';

@Module({
  imports: [TenantModule],
  controllers: [AdminTenantController],
  providers: [AdminTenantService],
  exports: [AdminTenantService],
})
export class AdminTenantModule {}

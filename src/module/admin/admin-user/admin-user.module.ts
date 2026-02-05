// admin-user.module.ts - Main module that imports all admin user submodules

import { Module } from '@nestjs/common';
import { AdminUserClientModule } from './admin-user-client/admin-user-client.module';
import { AdminUserPosModule } from './admin-user-pos/admin-user-pos.module';
import { AdminUserTenantModule } from './admin-user-tenant/admin-user-tenant.module';
import { AdminUserTenantOperatorModule } from './admin-user-tenant-operator/admin-user-tenant-operator.module';
import { AdminUserDriverModule } from './admin-user-driver/admin-user-driver.module';
import { AdminUserMainModule } from './admin-user-main/admin-user-main.module';

@Module({
  imports: [
    AdminUserMainModule,
    AdminUserPosModule,
    AdminUserClientModule,
    AdminUserDriverModule,
    AdminUserTenantModule,
    AdminUserTenantOperatorModule,
  ],
  exports: [
    AdminUserMainModule,
    AdminUserPosModule,
    AdminUserClientModule,
    AdminUserDriverModule,
    AdminUserTenantModule,
    AdminUserTenantOperatorModule,
  ],
})
export class AdminUserModule {}

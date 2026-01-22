// tenant-operator.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { UserTenantOperatorService } from './user-tenant-operator.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [UserTenantOperatorService],
  exports: [UserTenantOperatorService],
})
export class UserTenantOperatorModule {}

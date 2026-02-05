// admin-tenant.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from '@/module/core/user/user/schema/user.schema';
import { UserTenantModule } from '@/module/core/user/user-tenant/user-tenant.module';
import { AdminUserTenantService } from './admin-user-tenant.service';
import { AdminUserTenantController } from './admin-user-tenant.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
    forwardRef(() => UserTenantModule),
  ],
  providers: [AdminUserTenantService],
  controllers: [AdminUserTenantController],
  exports: [AdminUserTenantService],
})
export class AdminUserTenantModule {}

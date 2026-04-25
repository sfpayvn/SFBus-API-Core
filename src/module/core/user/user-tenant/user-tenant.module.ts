// tenant.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { UserTenantService } from './user-tenant.service';
import { TenantModule } from '../../tenant/tenant.module';
import { TenantSubscriptionModule } from '../../tenant-subscription/tenant-subscription.module';
import { UserDocument, UserSchema } from '../user/schema/user.schema';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => TenantModule),
    forwardRef(() => TenantSubscriptionModule),
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
  ],
  providers: [UserTenantService],
  exports: [UserTenantService],
})
export class UserTenantModule {}

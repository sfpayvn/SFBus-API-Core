// user.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller'; // Thêm dòng này
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './schema/user.schema';
import { TenantModule } from '../../tenant/tenant.module';
import { TenantSubscriptionModule } from '../../tenant-subscription/tenant-subscription.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
    forwardRef(() => TenantModule),
    forwardRef(() => TenantSubscriptionModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, MongooseModule],
})
export class UserModule {}

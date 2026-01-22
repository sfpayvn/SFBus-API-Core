import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { TenantDocument, TenantSchema } from './schema/tenant.schema';
import { TenantSubscriptionModule } from '../tenant-subscription/tenant-subscription.module';
import { FileModule } from '../file/file/file.module';
import { UserModule } from '../user/user/user.module';
import { SubscriptionModule } from '../subscription/subscription.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TenantDocument.name, schema: TenantSchema }]),
    forwardRef(() => TenantSubscriptionModule),
    forwardRef(() => FileModule),
    forwardRef(() => UserModule),
    forwardRef(() => SubscriptionModule),
  ],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}

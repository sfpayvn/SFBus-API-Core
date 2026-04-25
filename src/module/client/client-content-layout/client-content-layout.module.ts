import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientContentLayoutService } from './client-content-layout.service';
import { ClientContentLayoutController } from './client-content-layout.controller';
import { ContentLayoutDocument, ContentLayoutSchema } from '@/module/core/content-layout/schemas/content-layout.schema';
import { ContentLayoutModule } from '@/module/core/content-layout/content-layout.module';
import { ClientTenantModule } from '../client-tenant/client-tenant.module';
import { TenantModule } from '@/module/core/tenant/tenant.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ContentLayoutDocument.name, schema: ContentLayoutSchema }]),
    forwardRef(() => ContentLayoutModule),
    forwardRef(() => ClientTenantModule),
    forwardRef(() => TenantModule),
  ],
  providers: [ClientContentLayoutService],
  controllers: [ClientContentLayoutController],
  exports: [ClientContentLayoutService],
})
export class ClientContentLayoutModule {}

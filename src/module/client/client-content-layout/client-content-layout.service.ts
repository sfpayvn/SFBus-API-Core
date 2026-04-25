import { Injectable, forwardRef, Inject, Type } from '@nestjs/common';
import { ContentLayoutService } from '@/module/core/content-layout/content-layout.service';
import { Types } from 'mongoose';
import { ClientContentLayoutDto } from './dto/client-content-layout.dto';
import { ClientTenantService } from '../client-tenant/client-tenant.service';

@Injectable()
export class ClientContentLayoutService {
  constructor(
    @Inject(forwardRef(() => ContentLayoutService))
    private readonly contentLayoutService: ContentLayoutService,
    @Inject(forwardRef(() => ClientTenantService))
    private readonly clientTenantService: ClientTenantService,
  ) {}

  async findAvailableSlug(appSource: string, platform: string, tenantCode: string): Promise<string[]> {
    const tenant = await this.clientTenantService.findByCode(tenantCode);
    return this.contentLayoutService.findAvailableSlug(appSource, platform, tenant._id);
  }

  async findAvailableBySlug(
    appSource: string,
    platform: string,
    slug: string,
    tenantCode: string,
  ): Promise<ClientContentLayoutDto> {
    const tenant = await this.clientTenantService.findByCode(tenantCode);
    return this.contentLayoutService.findAvailableBySlug(appSource, platform, slug, tenant._id);
  }

  // New methods that accept tenantId directly (used with TenantCodeInterceptor)
  async findAvailableSlugByTenantId(
    appSource: string,
    platform: string,
    tenantId: Types.ObjectId,
  ): Promise<string[]> {
    return this.contentLayoutService.findAvailableSlug(appSource, platform, tenantId);
  }

  async findAvailableBySlugForTenantId(
    appSource: string,
    platform: string,
    slug: string,
    tenantId: Types.ObjectId,
  ): Promise<ClientContentLayoutDto> {
    return this.contentLayoutService.findAvailableBySlug(appSource, platform, slug, tenantId);
  }
}

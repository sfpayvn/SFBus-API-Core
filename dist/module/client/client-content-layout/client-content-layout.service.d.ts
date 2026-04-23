import { ContentLayoutService } from '@/module/core/content-layout/content-layout.service';
import { Types } from 'mongoose';
import { ClientContentLayoutDto } from './dto/client-content-layout.dto';
import { ClientTenantService } from '../client-tenant/client-tenant.service';
export declare class ClientContentLayoutService {
    private readonly contentLayoutService;
    private readonly clientTenantService;
    constructor(contentLayoutService: ContentLayoutService, clientTenantService: ClientTenantService);
    findAvailableSlug(appSource: string, platform: string, tenantCode: string): Promise<string[]>;
    findAvailableBySlug(appSource: string, platform: string, slug: string, tenantCode: string): Promise<ClientContentLayoutDto>;
    findAvailableSlugByTenantId(appSource: string, platform: string, tenantId: Types.ObjectId): Promise<string[]>;
    findAvailableBySlugForTenantId(appSource: string, platform: string, slug: string, tenantId: Types.ObjectId): Promise<ClientContentLayoutDto>;
}

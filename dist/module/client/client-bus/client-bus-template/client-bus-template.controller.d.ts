import { ClientBusTemplateService } from './client-bus-template.service';
import { ClientSearchBusTemplateQuery } from './dto/client-bus-template.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class ClientBusTemplateController {
    private readonly ClientBusTemplateService;
    constructor(ClientBusTemplateService: ClientBusTemplateService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-template.dto").ClientBusTemplateDto[]>;
    search(query: ClientSearchBusTemplateQuery, tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-template.dto").ClientSearchBusTemplateRes>;
}

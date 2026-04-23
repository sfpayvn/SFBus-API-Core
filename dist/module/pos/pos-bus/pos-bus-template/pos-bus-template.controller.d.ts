import { PosBusTemplateService } from './pos-bus-template.service';
import { PosSearchBusTemplateQuery } from './dto/pos-bus-template.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class PosBusTemplateController {
    private readonly PosBusTemplateService;
    constructor(PosBusTemplateService: PosBusTemplateService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-template.dto").PosBusTemplateDto[]>;
    search(query: PosSearchBusTemplateQuery, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-template.dto").PosSearchBusTemplateRes>;
}

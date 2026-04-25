import { Types } from 'mongoose';
import { ClientSearchBusLayoutTemplateQuery } from './dto/client-bus-layout-template.dto';
import { ClientBusLayoutTemplateService } from './client-bus-layout-template.service';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class ClientBusLayoutTemplateController {
    private readonly ClientBusLayoutTemplateService;
    constructor(ClientBusLayoutTemplateService: ClientBusLayoutTemplateService);
    findAll(tenantScope: TenantScopeResult): Promise<import("../../../core/bus/bus-layout-template/dto/bus-layout-template.dto").BusLayoutTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-layout-template.dto").ClientBusLayoutTemplateDto>;
    search(query: ClientSearchBusLayoutTemplateQuery, tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-layout-template.dto").ClientSearchBusTemplateRes>;
}

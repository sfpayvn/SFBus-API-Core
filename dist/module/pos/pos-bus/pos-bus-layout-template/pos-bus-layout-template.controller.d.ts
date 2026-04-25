import { Types } from 'mongoose';
import { PosSearchBusLayoutTemplateQuery } from './dto/pos-bus-layout-template.dto';
import { PosBusLayoutTemplateService } from './pos-bus-layout-template.service';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class PosBusLayoutTemplateController {
    private readonly PosBusLayoutTemplateService;
    constructor(PosBusLayoutTemplateService: PosBusLayoutTemplateService);
    findAll(tenantScope: TenantScopeResult): Promise<import("../../../core/bus/bus-layout-template/dto/bus-layout-template.dto").BusLayoutTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-layout-template.dto").PosBusLayoutTemplateDto>;
    search(query: PosSearchBusLayoutTemplateQuery, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-layout-template.dto").PosSearchBusTemplateRes>;
}

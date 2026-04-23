import { DriverBusTemplateService } from './driver-bus-template.service';
import { DriverSearchBusTemplateQuery } from './dto/driver-bus-template.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class DriverBusTemplateController {
    private readonly DriverBusTemplateService;
    constructor(DriverBusTemplateService: DriverBusTemplateService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-template.dto").DriverBusTemplateDto[]>;
    search(query: DriverSearchBusTemplateQuery, tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-template.dto").DriverSearchBusTemplateRes>;
}

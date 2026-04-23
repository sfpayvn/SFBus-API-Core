import { Types } from 'mongoose';
import { DriverSearchBusLayoutTemplateQuery } from './dto/driver-bus-layout-template.dto';
import { DriverBusLayoutTemplateService } from './driver-bus-layout-template.service';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class DriverBusLayoutTemplateController {
    private readonly DriverBusLayoutTemplateService;
    constructor(DriverBusLayoutTemplateService: DriverBusLayoutTemplateService);
    findAll(tenantScope: TenantScopeResult): Promise<import("../../../core/bus/bus-layout-template/dto/bus-layout-template.dto").BusLayoutTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-layout-template.dto").DriverBusLayoutTemplateDto>;
    search(query: DriverSearchBusLayoutTemplateQuery, tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-layout-template.dto").DriverSearchBusTemplateRes>;
}

import { ClientBusScheduleTemplateService } from './client-bus-schedule-template.service';
import { Types } from 'mongoose';
import { ClientSearchBusScheduleTemplateQuery } from './dto/client-bus-schedule-template.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class ClientBusScheduleTemplateController {
    private readonly ClientBusScheduleTemplateService;
    constructor(ClientBusScheduleTemplateService: ClientBusScheduleTemplateService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-schedule-template.dto").ClientBusScheduleTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/client-bus-schedule-template.dto").ClientBusScheduleTemplateDto>;
    search(query: ClientSearchBusScheduleTemplateQuery, tenantScope: TenantScopeResult): Promise<import("../../../core/bus/bus-schedule-template/dto/bus-schedule-template.dto").SearchBusScheduleTemplateRes>;
}

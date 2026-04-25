import { PosBusScheduleTemplateService } from './pos-bus-schedule-template.service';
import { Types } from 'mongoose';
import { PosSearchBusScheduleTemplateQuery } from './dto/pos-bus-schedule-template.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class PosBusScheduleTemplateController {
    private readonly posBusScheduleTemplateService;
    constructor(posBusScheduleTemplateService: PosBusScheduleTemplateService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-schedule-template.dto").PosBusScheduleTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus-schedule-template.dto").PosBusScheduleTemplateDto>;
    search(query: PosSearchBusScheduleTemplateQuery, tenantScope: TenantScopeResult): Promise<import("../../../core/bus/bus-schedule-template/dto/bus-schedule-template.dto").SearchBusScheduleTemplateRes>;
}

import { DriverBusScheduleTemplateService } from './driver-bus-schedule-template.service';
import { Types } from 'mongoose';
import { DriverSearchBusScheduleTemplateQuery } from './dto/driver-bus-schedule-template.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class DriverBusScheduleTemplateController {
    private readonly DriverBusScheduleTemplateService;
    constructor(DriverBusScheduleTemplateService: DriverBusScheduleTemplateService);
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-schedule-template.dto").DriverBusScheduleTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/driver-bus-schedule-template.dto").DriverBusScheduleTemplateDto>;
    search(query: DriverSearchBusScheduleTemplateQuery, tenantScope: TenantScopeResult): Promise<import("../../../core/bus/bus-schedule-template/dto/bus-schedule-template.dto").SearchBusScheduleTemplateRes>;
}

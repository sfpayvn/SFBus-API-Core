import { AdminBusScheduleTemplateService } from './admin-bus-schedule-template.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { AdminSearchBusScheduleTemplateQuery } from './dto/admin-admin-bus-schedule-template.dto';
import { AdminCreateBusScheduleTemplateDto } from './dto/admin-create-bus-schedule-template.dto';
import { AdminUpdateBusScheduleTemplateDto } from './dto/admin-update-bus-schedule-template.dto';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class AdminBusScheduleTemplateController {
    private readonly adminBusScheduleTemplateService;
    constructor(adminBusScheduleTemplateService: AdminBusScheduleTemplateService);
    create(adminCreateBusScheduleTemplateDto: AdminCreateBusScheduleTemplateDto, user: UserTokenDto): Promise<import("../../../core/bus/bus-schedule-template/dto/bus-schedule-template.dto").BusScheduleTemplateDto>;
    update(adminUpdateBusScheduleTemplateDto: AdminUpdateBusScheduleTemplateDto, user: UserTokenDto): Promise<import("../../../core/bus/bus-schedule-template/dto/bus-schedule-template.dto").BusScheduleTemplateDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<(import("mongoose").FlattenMaps<import("../../../core/bus/bus-schedule-template/schema/bus-schedule-template.schema").BusScheduleTemplateDocument> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    }) | null>;
    findAll(tenantScope: TenantScopeResult): Promise<import("./dto/admin-admin-bus-schedule-template.dto").AdminBusScheduleTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/admin-admin-bus-schedule-template.dto").AdminBusScheduleTemplateDto>;
    search(query: AdminSearchBusScheduleTemplateQuery, tenantScope: TenantScopeResult): Promise<import("../../../core/bus/bus-schedule-template/dto/bus-schedule-template.dto").SearchBusScheduleTemplateRes>;
}

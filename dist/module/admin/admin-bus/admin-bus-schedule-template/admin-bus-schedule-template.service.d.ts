import { BusScheduleTemplateDocument } from '@/module/core/bus/bus-schedule-template/schema/bus-schedule-template.schema';
import { Model, Types } from 'mongoose';
import { AdminCreateBusScheduleTemplateDto } from './dto/admin-create-bus-schedule-template.dto';
import { BusScheduleTemplateService } from '@/module/core/bus/bus-schedule-template/bus-schedule-template.service';
import { AdminUpdateBusScheduleTemplateDto } from './dto/admin-update-bus-schedule-template.dto';
import { AdminBusScheduleTemplateDto, AdminSearchBusScheduleTemplateQuerySortFilter } from './dto/admin-admin-bus-schedule-template.dto';
export declare class AdminBusScheduleTemplateService {
    private BusScheduleTemplateModel;
    private readonly busScheduleTemplateService;
    ROOT_TENANT_ID: string;
    constructor(BusScheduleTemplateModel: Model<BusScheduleTemplateDocument>, busScheduleTemplateService: BusScheduleTemplateService);
    create(adminCreateBusScheduleTemplateDto: AdminCreateBusScheduleTemplateDto, tenantId: Types.ObjectId): Promise<import("../../../core/bus/bus-schedule-template/dto/bus-schedule-template.dto").BusScheduleTemplateDto>;
    update(adminUpdateBusScheduleTemplateDto: AdminUpdateBusScheduleTemplateDto, tenantId: Types.ObjectId): Promise<import("../../../core/bus/bus-schedule-template/dto/bus-schedule-template.dto").BusScheduleTemplateDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<(import("mongoose").FlattenMaps<BusScheduleTemplateDocument> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    }) | null>;
    findAll(tenantIds: Types.ObjectId[]): Promise<AdminBusScheduleTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminBusScheduleTemplateDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchBusScheduleTemplateQuerySortFilter, filters: AdminSearchBusScheduleTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<import("../../../core/bus/bus-schedule-template/dto/bus-schedule-template.dto").SearchBusScheduleTemplateRes>;
}

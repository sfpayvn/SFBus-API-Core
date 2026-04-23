import { BusScheduleTemplateDocument } from '@/module/core/bus/bus-schedule-template/schema/bus-schedule-template.schema';
import { Model, Types } from 'mongoose';
import { BusScheduleTemplateService } from '@/module/core/bus/bus-schedule-template/bus-schedule-template.service';
import { DriverBusScheduleTemplateDto, DriverSearchBusScheduleTemplateQuerySortFilter } from './dto/driver-bus-schedule-template.dto';
export declare class DriverBusScheduleTemplateService {
    private BusScheduleTemplateModel;
    private readonly busScheduleTemplateService;
    ROOT_TENANT_ID: string;
    constructor(BusScheduleTemplateModel: Model<BusScheduleTemplateDocument>, busScheduleTemplateService: BusScheduleTemplateService);
    findAll(tenantIds: Types.ObjectId[]): Promise<DriverBusScheduleTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<DriverBusScheduleTemplateDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: DriverSearchBusScheduleTemplateQuerySortFilter, filters: DriverSearchBusScheduleTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<import("../../../core/bus/bus-schedule-template/dto/bus-schedule-template.dto").SearchBusScheduleTemplateRes>;
}

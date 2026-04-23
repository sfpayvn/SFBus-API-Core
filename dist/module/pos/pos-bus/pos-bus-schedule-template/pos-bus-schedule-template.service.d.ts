import { BusScheduleTemplateDocument } from '@/module/core/bus/bus-schedule-template/schema/bus-schedule-template.schema';
import { Model, Types } from 'mongoose';
import { BusScheduleTemplateService } from '@/module/core/bus/bus-schedule-template/bus-schedule-template.service';
import { PosBusScheduleTemplateDto, PosSearchBusScheduleTemplateQuerySortFilter } from './dto/pos-bus-schedule-template.dto';
export declare class PosBusScheduleTemplateService {
    private BusScheduleTemplateModel;
    private readonly busScheduleTemplateService;
    ROOT_TENANT_ID: string;
    constructor(BusScheduleTemplateModel: Model<BusScheduleTemplateDocument>, busScheduleTemplateService: BusScheduleTemplateService);
    findAll(tenantIds: Types.ObjectId[]): Promise<PosBusScheduleTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosBusScheduleTemplateDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: PosSearchBusScheduleTemplateQuerySortFilter, filters: PosSearchBusScheduleTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<import("../../../core/bus/bus-schedule-template/dto/bus-schedule-template.dto").SearchBusScheduleTemplateRes>;
}

import { BusScheduleTemplateDocument } from '@/module/core/bus/bus-schedule-template/schema/bus-schedule-template.schema';
import { Model, Types } from 'mongoose';
import { BusScheduleTemplateService } from '@/module/core/bus/bus-schedule-template/bus-schedule-template.service';
import { ClientBusScheduleTemplateDto, ClientSearchBusScheduleTemplateQuerySortFilter } from './dto/client-bus-schedule-template.dto';
export declare class ClientBusScheduleTemplateService {
    private BusScheduleTemplateModel;
    private readonly busScheduleTemplateService;
    ROOT_TENANT_ID: string;
    constructor(BusScheduleTemplateModel: Model<BusScheduleTemplateDocument>, busScheduleTemplateService: BusScheduleTemplateService);
    findAll(tenantIds: Types.ObjectId[]): Promise<ClientBusScheduleTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<ClientBusScheduleTemplateDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: ClientSearchBusScheduleTemplateQuerySortFilter, filters: ClientSearchBusScheduleTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<import("../../../core/bus/bus-schedule-template/dto/bus-schedule-template.dto").SearchBusScheduleTemplateRes>;
}

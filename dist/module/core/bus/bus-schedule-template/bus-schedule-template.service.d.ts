import { CreateBusScheduleTemplateDto } from './dto/create-bus-schedule-template.dto';
import { UpdateBusScheduleTemplateDto } from './dto/update-bus-schedule-template.dto';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { BusScheduleTemplateDto, SearchBusScheduleTemplateQuerySortFilter, SearchBusScheduleTemplateRes } from './dto/bus-schedule-template.dto';
import { BusScheduleTemplateDocument } from './schema/bus-schedule-template.schema';
import { BusService } from '../bus/bus.service';
import { BusLayoutTemplateService } from '../bus-layout-template/bus-layout-template.service';
export declare class BusScheduleTemplateService {
    private busScheduleTemplateModel;
    private readonly busService;
    private readonly busLayoutTemplateService;
    constructor(busScheduleTemplateModel: Model<BusScheduleTemplateDocument>, busService: BusService, busLayoutTemplateService: BusLayoutTemplateService);
    create(createBusScheduleTemplateDto: CreateBusScheduleTemplateDto, tenantId: Types.ObjectId): Promise<BusScheduleTemplateDto>;
    update(updateBusScheduleTemplateDto: UpdateBusScheduleTemplateDto, tenantId: Types.ObjectId): Promise<BusScheduleTemplateDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<BusScheduleTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusScheduleTemplateDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusScheduleTemplateQuerySortFilter, filters: SearchBusScheduleTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<SearchBusScheduleTemplateRes>;
    buildQuerySearchBusScheduleTemplate(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusScheduleTemplateQuerySortFilter, filters: SearchBusScheduleTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<any>;
}

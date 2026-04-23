import { BusLayoutTemplateDto, SearchBusLayoutTemplateQuerySortFilter } from '@/module/core/bus/bus-layout-template/dto/bus-layout-template.dto';
import { BusLayoutTemplateDocument } from '@/module/core/bus/bus-layout-template/schema/bus-layout-template.schema';
import { Model, Types } from 'mongoose';
import { ClientBusLayoutTemplateDto, ClientSearchBusTemplateRes } from './dto/client-bus-layout-template.dto';
import { BusLayoutTemplateService } from '@/module/core/bus/bus-layout-template/bus-layout-template.service';
export declare class ClientBusLayoutTemplateService {
    private busLayoutTemplateModel;
    private readonly busLayoutTemplateService;
    ROOT_TENANT_ID: string;
    constructor(busLayoutTemplateModel: Model<BusLayoutTemplateDocument>, busLayoutTemplateService: BusLayoutTemplateService);
    findAll(tenantIds: Types.ObjectId[]): Promise<BusLayoutTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<ClientBusLayoutTemplateDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusLayoutTemplateQuerySortFilter, filters: SearchBusLayoutTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<ClientSearchBusTemplateRes>;
}

import { BusTemplateService } from '@/module/core/bus/bus-template/bus-template.service';
import { BusTemplateDocument } from '@/module/core/bus/bus-template/schema/bus-template.schema';
import { Model, Types } from 'mongoose';
import { ClientBusTemplateDto, ClientSearchBusTemplateQuerySortFilter, ClientSearchBusTemplateRes } from './dto/client-bus-template.dto';
export declare class ClientBusTemplateService {
    private readonly busTemplateModel;
    private readonly busTemplateService;
    ROOT_TENANT_ID: string;
    constructor(busTemplateModel: Model<BusTemplateDocument>, busTemplateService: BusTemplateService);
    findAll(tenantIds: Types.ObjectId[]): Promise<ClientBusTemplateDto[]>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: ClientSearchBusTemplateQuerySortFilter, filters: ClientSearchBusTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<ClientSearchBusTemplateRes>;
}

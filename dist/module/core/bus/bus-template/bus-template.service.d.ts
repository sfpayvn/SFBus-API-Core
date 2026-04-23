import { BusTemplateDto, SearchBusTemplateQuerySortFilter, SearchBusTemplateRes } from './dto/bus-template.dto';
import { Model, Types } from 'mongoose';
import { BusTemplateDocument } from './schema/bus-template.schema';
import { BusServiceService } from '../bus-service/bus-service.service';
import { BusTypeService } from '../bus-type/bus-type.service';
import { UpdateBusTemplateDto } from './dto/update-bus-template.dto';
import { CreateBusTemplateDto } from './dto/create-bus-template.dto';
export declare class BusTemplateService {
    private readonly busTemplateModel;
    private readonly busServiceService;
    private readonly busTypeService;
    constructor(busTemplateModel: Model<BusTemplateDocument>, busServiceService: BusServiceService, busTypeService: BusTypeService);
    create(createBusTemplateDto: CreateBusTemplateDto, tenantId: Types.ObjectId): Promise<BusTemplateDto>;
    update(updateBusTemplateDto: UpdateBusTemplateDto, tenantId: Types.ObjectId): Promise<BusTemplateDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusTemplateDto>;
    findAll(tenantIds: Types.ObjectId[]): Promise<BusTemplateDto[]>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusTemplateQuerySortFilter, filters: SearchBusTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<SearchBusTemplateRes>;
    buildQuerySearchBusTemplate(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusTemplateQuerySortFilter, filters: SearchBusTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<any>;
}

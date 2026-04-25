import { Model, Types } from 'mongoose';
import { BusLayoutTemplateDocument } from './schema/bus-layout-template.schema';
import { BusLayoutTemplateDto, SearchBusLayoutTemplateQuerySortFilter, SearchBusTemplateRes } from './dto/bus-layout-template.dto';
import { CreateBusLayoutTemplateDto } from './dto/create-bus-layout-template.dto';
import { UpdateBusLayoutTemplateDto } from './dto/update-bus-layout-template.dto';
export declare class BusLayoutTemplateService {
    private busLayoutTemplateModel;
    constructor(busLayoutTemplateModel: Model<BusLayoutTemplateDocument>);
    create(createBusLayoutTemplateDto: CreateBusLayoutTemplateDto, tenantId: Types.ObjectId): Promise<BusLayoutTemplateDto>;
    update(updateBusLayoutTemplateDto: UpdateBusLayoutTemplateDto, tenantId: Types.ObjectId): Promise<BusLayoutTemplateDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<BusLayoutTemplateDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusLayoutTemplateDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusLayoutTemplateQuerySortFilter, filters: SearchBusLayoutTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<SearchBusTemplateRes>;
    buildQuerySearchBusLayoutTemplate(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusLayoutTemplateQuerySortFilter, filters: SearchBusLayoutTemplateQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<any>;
}

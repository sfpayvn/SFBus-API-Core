import { CreateBusDto } from './dto/create-bus.dto';
import { BusDto, SearchBusQuerySortFilter, SearchBusRes } from './dto/bus.dto';
import { Model, Types } from 'mongoose';
import { BusDocument } from './schema/bus.schema';
import { BusServiceService } from '../bus-service/bus-service.service';
import { BusTypeService } from '../bus-type/bus-type.service';
import { UpdateBusDto } from './dto/update-bus.dto';
import { BusTemplateService } from '../bus-template/bus-template.service';
export declare class BusService {
    private readonly busModel;
    private readonly busServiceService;
    private readonly busTypeService;
    private readonly busTemplateService;
    constructor(busModel: Model<BusDocument>, busServiceService: BusServiceService, busTypeService: BusTypeService, busTemplateService: BusTemplateService);
    create(createBusDto: CreateBusDto, tenantId: Types.ObjectId): Promise<BusDto>;
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<BusDto | null>;
    findByBusTemplate(busTemplateId: Types.ObjectId, tenantId: Types.ObjectId, rootTenantId: Types.ObjectId): Promise<BusDto[] | []>;
    findAll(tenantId: Types.ObjectId): Promise<BusDto[]>;
    update(updateBusDto: UpdateBusDto, tenantId: Types.ObjectId): Promise<BusDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusQuerySortFilter, filters: SearchBusQuerySortFilter[], tenantId: Types.ObjectId): Promise<SearchBusRes>;
    buildQuerySearchBus(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusQuerySortFilter, filters: SearchBusQuerySortFilter[], tenantId: Types.ObjectId): Promise<any>;
}

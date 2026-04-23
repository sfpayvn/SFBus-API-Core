import { Model, Types } from 'mongoose';
import { BusTypeDto, SearchBusTypesQuerySortFilter, SearchBusTypesRes } from './dto/bus-type.dto';
import { CreateBusTypeDto } from './dto/create-bus-type.dto';
import { UpdateBusTypeDto } from './dto/update-bus-type.dto';
import { BusTypeDocument } from './schema/bus-type.schema';
export declare class BusTypeService {
    private readonly busTypeModel;
    constructor(busTypeModel: Model<BusTypeDocument>);
    create(createBusTypeDto: CreateBusTypeDto, tenantId: Types.ObjectId): Promise<BusTypeDto>;
    update(updateBusTypeDto: UpdateBusTypeDto, tenantId: Types.ObjectId): Promise<BusTypeDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<BusTypeDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusTypeDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusTypesQuerySortFilter, filters: SearchBusTypesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<SearchBusTypesRes>;
    buildQuerySearchBusTypes(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchBusTypesQuerySortFilter, filters: SearchBusTypesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<any>;
}

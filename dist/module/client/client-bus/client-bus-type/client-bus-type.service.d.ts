import { Model, Types } from 'mongoose';
import { BusTypeDocument } from '@/module/core/bus/bus-type/schema/bus-type.schema';
import { BusTypeService } from '@/module/core/bus/bus-type/bus-type.service';
import { ClientBusTypeDto, ClientSearchBusTypesQuerySortFilter, ClientSearchBusTypesRes } from './dto/client-bus-type.dto';
export declare class ClientBusTypeService {
    private readonly busTypeModel;
    private readonly busTypeService;
    ROOT_TENANT_ID: string;
    constructor(busTypeModel: Model<BusTypeDocument>, busTypeService: BusTypeService);
    findAll(tenantIds: Types.ObjectId[]): Promise<ClientBusTypeDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<ClientBusTypeDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: ClientSearchBusTypesQuerySortFilter, filters: ClientSearchBusTypesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<ClientSearchBusTypesRes>;
}

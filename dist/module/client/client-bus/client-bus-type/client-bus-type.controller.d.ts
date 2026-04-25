import { ClientBusTypeService } from './client-bus-type.service';
import { Types } from 'mongoose';
import { ClientSearchBusTypesQuery } from './dto/client-bus-type.dto';
export declare class ClientBusTypeController {
    private readonly ClientBusTypeService;
    constructor(ClientBusTypeService: ClientBusTypeService);
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<import("./dto/client-bus-type.dto").ClientBusTypeDto>;
    findAll(tenantIds: Types.ObjectId[]): Promise<import("./dto/client-bus-type.dto").ClientBusTypeDto[]>;
    search(query: ClientSearchBusTypesQuery, tenantIds: Types.ObjectId[]): Promise<import("./dto/client-bus-type.dto").ClientSearchBusTypesRes>;
}

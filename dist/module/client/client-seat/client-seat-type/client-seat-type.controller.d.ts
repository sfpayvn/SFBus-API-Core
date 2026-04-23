import { ClientSeatTypeService } from './client-seat-type.service';
import { Types } from 'mongoose';
import { ClientSearchSeatTypesQuery } from './dto/client-seat-type.dto';
export declare class ClientSeatTypeController {
    private readonly ClientSeatTypeService;
    constructor(ClientSeatTypeService: ClientSeatTypeService);
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<import("./dto/client-seat-type.dto").ClientSeatTypeDto>;
    findAll(tenantIds: Types.ObjectId[]): Promise<import("./dto/client-seat-type.dto").ClientSeatTypeDto[]>;
    search(query: ClientSearchSeatTypesQuery, tenantIds: Types.ObjectId[]): Promise<import("./dto/client-seat-type.dto").ClientSearchSeatTypeRes>;
}

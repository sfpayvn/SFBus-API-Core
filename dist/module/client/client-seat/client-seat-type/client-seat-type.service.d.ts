import { SeatTypeDocument } from '@/module/core/seat/seat-type/schema/seat-type.schema';
import { SeatTypeService } from '@/module/core/seat/seat-type/seat-type.service';
import { Model, Types } from 'mongoose';
import { ClientSeatTypeDto, ClientSearchSeatTypesQuerySortFilter, ClientSearchSeatTypeRes } from './dto/client-seat-type.dto';
export declare class ClientSeatTypeService {
    private readonly seatTypeModel;
    private readonly seatTypeService;
    ROOT_TENANT_ID: string;
    constructor(seatTypeModel: Model<SeatTypeDocument>, seatTypeService: SeatTypeService);
    findAll(tenantIds: Types.ObjectId[]): Promise<ClientSeatTypeDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<ClientSeatTypeDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: ClientSearchSeatTypesQuerySortFilter, filters: ClientSearchSeatTypesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<ClientSearchSeatTypeRes>;
}
